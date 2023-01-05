import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type {
  Person,
  PersonMovieCreditsResponse,
  PersonTvCreditsResponse,
} from "moviedb-promise";
import { z } from "zod";
import tmdb from "~/tmdb.server";

export async function loader({ params }: LoaderArgs) {
  const { id } = await z
    .object({
      id: z.string(),
    })
    .parseAsync(params);
  const actor = (await tmdb.personInfo({
    id,
    append_to_response: "movie_credits,tv_credits",
  })) as Person & {
    movie_credits: PersonMovieCreditsResponse;
    tv_credits: PersonTvCreditsResponse;
  };
  return actor;
}

const Actor: React.FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="max-w-[1280px] mx-auto py-4 relative px-2">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face${data.profile_path}`}
          alt={data.name}
          width={220}
          height={330}
          className="drop-shadow-lg lg:rounded-lg mx-auto"
        />
        <figcaption className="text-center mt-2 text-4xl font-bold tracking-tighter drop-shadow underline">
          {data.name}
        </figcaption>
      </figure>
      <div className="flex flex-col gap-12 sm:gap-24 my-6">
        <p>{data.biography}</p>
        <section>
          <h3 className="text-3xl mb-4">Kariyer</h3>
          <ul>
            {data.movie_credits?.cast?.map((cast, i) => (
              <Link key={i} to={`/film/${cast.id}`}>
                <li>
                  {cast.character}
                  <sub>({cast.title})</sub>
                </li>
              </Link>
            ))}
            {data.tv_credits?.cast?.map((cast, i) => (
              <Link key={i} to={`/dizi/${cast.id}`}>
                <li>
                  {cast.character}
                  <sub>({cast.name})</sub>
                </li>
              </Link>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Actor;
