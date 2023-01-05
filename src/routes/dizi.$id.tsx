import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import tmdb from "~/tmdb.server";
import { Star } from "phosphor-react";
import type { ShowResponse, VideosResponse } from "moviedb-promise";

export async function loader({ params }: LoaderArgs) {
  const { id } = await z
    .object({
      id: z.string(),
    })
    .parseAsync(params);
  const show = (await tmdb.tvInfo({
    id,
    append_to_response: "videos,seasons",
  })) as ShowResponse & { videos: VideosResponse };
  return show;
}

const TvShow: React.FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="max-w-[1280px] mx-auto py-4 relative px-2">
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${data.backdrop_path}`}
        alt={data.name}
        width={1920}
        height={600}
        className="drop-shadow-lg lg:rounded-lg"
      />
      <span className="absolute flex gap-1 items-center top-4 rounded-full m-2 p-2 font-bold text-white bg-yellow-500 border-2 z-10">
        <Star weight="fill" />
        {data.vote_average?.toFixed(1)}
      </span>
      <div className="flex flex-col gap-24 my-6">
        <div>
          <h1 className="text-center text-4xl font-bold tracking-tighter drop-shadow underline">
            {data.name}
          </h1>
          <p className="mt-6">{data.overview}</p>
        </div>
        <table className="table-auto border">
          <thead>
            <tr>
              <th>Sezon</th>
              <th>Bölüm sayısı</th>
              <th>Yayınlanma tarihi</th>
            </tr>
          </thead>
          <tbody>
            {data.seasons?.map((season) => (
              <>
                <tr className="text-center">
                  <td>{season.name}</td>
                  <td>{season.episode_count}</td>
                  <td>{season.air_date}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3 overflow-x-auto snap-x scrollbar pb-2">
          {data.videos.results
            ?.filter((video) => video.site === "YouTube")
            .map((video, i) => (
              <iframe
                key={i}
                width={1920 * 0.3}
                height={1080 * 0.3}
                title={video.name}
                src={`https://youtube.com/embed/${video.key}`}
                className="inline-block shrink-0"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TvShow;
