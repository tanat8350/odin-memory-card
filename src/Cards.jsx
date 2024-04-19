import './Cards.css';
import shuffle from './shuffle';
import pokemonList from './pokemonList';

function Card({ pokemon, onClick }) {
  const name = pokemon.name;
  const capitalizedName =
    name.charAt(0).toUpperCase() + name.substring(1, name.length);
  return (
    <div className="card" key={name} data-name={name} onClick={onClick}>
      <img src={pokemon.img} alt="" data-name={name} />
      <h2 data-name={name}>{capitalizedName}</h2>
    </div>
  );
}

export function Cards({ data, onClick }) {
  return (
    <div className="card-container">
      {shuffle(pokemonList).map((item) => (
        <Card pokemon={data[item]} onClick={onClick}></Card>
      ))}
    </div>
  );
}
