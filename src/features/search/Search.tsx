import type { LoaderArgs } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { useState } from "react";
import tmdb from "~/tmdb.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) {
    return null;
  }
  const { results } = await tmdb.searchMulti({ query });
  return results?.slice(0, 5);
}

const links = {
  movie: "film",
  tv: "dizi",
  person: "oyuncu",
};

const Card: React.FC<{ img?: string; text?: string }> = ({
  img: link,
  text,
}) => {
  if (!link || !text) {
    return <></>;
  }

  return (
    <div className="flex gap-2 p-1 hover:bg-neutral-100">
      <img
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${link}`}
        width={44}
        height={66}
        alt="poster"
      />
      <p>{text}</p>
    </div>
  );
};

type Props = {
  className?: string;
};

const Search: React.FC<Props> = ({ className }) => {
  const fetcher = useFetcher<typeof loader>();
  const [show, toggleShow] = useState(false);

  return (
    <div>
      <fetcher.Form
        method="get"
        action="/search"
        onChange={(e) => fetcher.submit(e.currentTarget)}
        onFocus={() => toggleShow(true)}
        onBlur={() => setTimeout(() => toggleShow(false), 100)}
      >
        <input
          type="text"
          name="query"
          className={`px-2 ${className}`}
          placeholder="Ara"
        />
      </fetcher.Form>
      {show && (
        <div className="border flex flex-col absolute mt-2 bg-white rounded top-auto w-screen h-screen left-0 sm:mt-auto sm:left-auto sm:w-auto sm:h-auto">
          {fetcher.data?.map((item, i) => (
            <Link
              key={i}
              to={`${links[item.media_type]}/${item.id}`}
              className=""
            >
              {item.media_type === "movie" ? (
                <Card img={item.poster_path} text={item.title} />
              ) : item.media_type === "tv" ? (
                <Card img={item.poster_path} text={item.name} />
              ) : item.media_type === "person" ? (
                <Card img={item.profile_path} text={item.name} />
              ) : (
                <>ERROR</>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
