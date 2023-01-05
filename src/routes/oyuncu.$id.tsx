import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import tmdb from "~/tmdb.server";

export async function loader({ params }: LoaderArgs) {
  const { id } = await z
    .object({
      id: z.string(),
    })
    .parseAsync(params);
  const actor = await tmdb.personInfo({
    id,
  });
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
      <div className="mt-4">
        <p>{data.biography}</p>
      </div>
    </div>
  );
};

export default Actor;
