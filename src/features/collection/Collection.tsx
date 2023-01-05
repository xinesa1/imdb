import type { Props as CardProps } from "~/features/collection/Card";
import Card from "~/features/collection/Card";

type Props = {
  collectionName: string | JSX.Element;
  cards: CardProps[];
};

const Collection: React.FC<Props> = ({ collectionName, cards }) => {
  return (
    <div className="w-full border-black">
      <h2 className="text-2xl">{collectionName}</h2>
      <hr />
      <div className="flex gap-4 overflow-x-auto snap-x scrollbar pb-2">
        {cards.map((card, i) => (
          <Card key={i} img={card.img} link={card.link} text={card.text} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
