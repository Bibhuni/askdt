// Import your giphy images
import hGiphy1 from "../assets/happy-giphy/giphy1.gif";
import hGiphy2 from "../assets/happy-giphy/giphy2.gif";
import hGiphy3 from "../assets/happy-giphy/giphy3.gif";
import hGiphy4 from "../assets/happy-giphy/giphy4.gif";

export const Giphy = [
  {
    giphy1: hGiphy1,
    giphy2: hGiphy2,
    giphy3: hGiphy3,
    giphy4: hGiphy4,
  }
];

// Function to get a random giphy
const getRandomGiphy = () => {
  const giphyKeys = Object.keys(Giphy[0]);
  const randomKey = giphyKeys[Math.floor(Math.random() * giphyKeys.length)];
  return Giphy[0][randomKey];
};

export default getRandomGiphy;
