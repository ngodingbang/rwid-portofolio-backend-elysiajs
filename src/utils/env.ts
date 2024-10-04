import { z } from "zod";

export default z
  .object({
    NODE_ENV: z
      .enum(["development", "production"])
      .transform((value) => value || "development"),
    PORT: z.string().transform((value) => value || "3000"),
  })
  .parse(process.env);
