import { MovieDb } from "moviedb-promise";
import { env } from "./env.server";

const tmdb = new MovieDb(env.TMDB_API_KEY);

export default tmdb;
