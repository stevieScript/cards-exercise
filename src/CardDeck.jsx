import Card from './Card';

const CardDeck = ({ cards}) => {
  return (
    <div className="card-deck">
      {cards.map(card => <Card key={card.code} {...card} />)}
    </div>
  );
}

export default CardDeck;