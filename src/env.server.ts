import { z } from "zod";

const schema = z.object({
  TMDB_API_KEY: z.string(),
});

export const env = schema.parse(process.env);
