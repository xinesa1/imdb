import { Link } from "@remix-run/react";

export type Props = {
  text: string;
  img: string;
  link: string;
};

const Card: React.FC<Props> = ({ img, text, link }) => {
  return (
    <Link
      to={link}
      className="inline-block w-36 shrink-0 snap-center relative hover:bg-neutral-200 rounded"
    >
      <img src={img} alt={text} />
      <p>{text}</p>
    </Link>
  );
};

export default Card;
