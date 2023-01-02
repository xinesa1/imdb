import { useLoaderData } from "@remix-run/react";
import type { MovieResult, PersonResult, TvResult } from "moviedb-promise";
import Collection from "~/features/collection/Collection";
import tmdb from "~/tmdb.server";

export async function loader() {
  const { results: movie } = await tmdb.trending({
    media_type: "movie",
    time_window: "week",
  });

  const { results: tv } = await tmdb.trending({
    media_type: "tv",
    time_window: "week",
  });

  const { results: person } = await tmdb.trending({
    media_type: "person",
    time_window: "week",
  });

  return {
    movie: movie as MovieResult[],
    tv: tv as TvResult[],
    person: person as PersonResult[],
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col gap-6 my-6 px-2">
      <Collection
        collectionName="Trend Filmler"
        cards={data.movie.map((movie, i) => ({
          text: movie.title || "",
          link: `film/${movie.id}`,
          img: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
        }))}
      />
      <Collection
        collectionName="Trend Diziler"
        cards={data.tv.map((tv, i) => ({
          text: tv.name || "",
          link: `dizi/${tv.id}`,
          img: `https://www.themoviedb.org/t/p/w220_and_h330_face${tv.poster_path}`,
        }))}
      />
      <Collection
        collectionName="Trend Oyuncular"
        cards={data.person.map((actor, i) => ({
          text: actor.name || "",
          link: `oyuncu/${actor.id}`,
          img: `https://www.themoviedb.org/t/p/w220_and_h330_face${actor.profile_path}`,
        }))}
      />
    </div>
  );
}
