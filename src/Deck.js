import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
   const [deck, setDeck] = useState(null);
   const [drawn, setDrawn] = useState([]);

   useEffect(() => {
      async function getDeck() {
         let newDeck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
         setDeck(newDeck.data);
      }
      getDeck();
   }, [setDeck]);

   const getCard = async () => {
      let {deck_id} = deck;

      try {
         let drawRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);

         if (drawRes.data.remaining === 0) {
            throw new Error("No cards remaining!");
         }

         const card = drawRes.data.cards[0];

         setDrawn(d => [
            ...d,
            {
               id: card.code,
               name: card.suit + " " + card.value,
               image: card.image
            }
         ]);
      } catch (err) {
         alert(err);
      }
   }

   return (
      <div>
         <div>
            <button onClick={getCard}>Gimme a card</button>
         </div>
         {drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image} />
         ))}
      </div>
   )
}

export default Deck;