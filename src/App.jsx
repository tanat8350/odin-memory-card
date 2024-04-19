import { useEffect, useState } from 'react';
import './App.css';
import { Cards } from './Cards';
import pokemonList from './pokemonList';

function App() {
  const [fetched, setFetched] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  useEffect(() => {
    pokemonList.forEach((item, index) => {
      fetch('https://pokeapi.co/api/v2/pokemon/' + item, { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setFetched((prev) => ({
            ...prev,
            [response.name]: {
              name: response.name,
              img: response.sprites.other['official-artwork'].front_default,
            },
          }));
          if (pokemonList.length === index + 1) setIsLoading(false);
        });
    });
  }, []);

  function clickHandler(e) {
    const target = e.target.dataset.name;
    console.log(target);

    if (clicked.indexOf(target) === -1) {
      const newScore = score + 1;
      setClicked([...clicked, target]);
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    } else {
      setScore(0);
      setClicked([]);
    }
  }
  return (
    <>
      <header>
        <div className="left">
          <h1>Odin Memory Card</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <div className="right">
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </div>
      </header>
      {!isLoading && <Cards data={fetched} onClick={clickHandler}></Cards>}
    </>
  );
}

export default App;
