import "./Card.css";

const Card = ({name, image, getCard}) => {
   
   return (
      <img 
         className="Card" 
         alt={name} 
         src={image} 
      />
   );
}

export default Card;