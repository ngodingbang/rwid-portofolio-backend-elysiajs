import { $, TLSOptions } from "bun";
import { mkdir } from "fs/promises";

export const generateTls = async (): Promise<TLSOptions | undefined> => {
  try {
    await $`mkcert -install`.quiet().nothrow();

    await mkdir("./certificates", { recursive: true });
    await $`mkcert -key-file ./certificates/localhost-key.pem -cert-file ./certificates/localhost.pem localhost 127.0.0.1 ::1`.quiet();

    return {
      key: await Bun.file("./certificates/localhost-key.pem").text(),
      cert: await Bun.file("./certificates/localhost.pem").text(),
    };
  } catch (error) {
    // @ts-ignore
    if (error?.name === "ShellError") {
      console.error(
        // @ts-ignore
        `Failed with code ${error?.exitCode}. Do you already installed "mkcert"? https://mkcert.dev/`
      );
    }

    console.error(error);
  }
};
