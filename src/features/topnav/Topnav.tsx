import { Link } from "@remix-run/react";
import Search from "../search/Search";

const Topnav: React.FC = () => {
  return (
    <nav className="flex p-2 border border-b gap-2 items-center">
      <Link to="/">
        <h1 className="text-2xl font-extrabold">IMDB</h1>
      </Link>
      <Search className="border border-black rounded" />
      <span className="ml-auto" />
     
     
    </nav>
  );
};

export default Topnav;
