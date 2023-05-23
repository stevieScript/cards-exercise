const Card = ({ suit, value, image }) => {
  return (
    <div className="card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
}

export default Card;