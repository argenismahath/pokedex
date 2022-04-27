import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemon, PonerPokemon] = useState("pikachu");
  const [pokemonData, PonerPokemonData] = useState([]);
  const [pokemonType, PonerPokemonType] = useState("");

  //set PonerPokemon to LowerCase
  const handleChange = (e) => {
    PonerPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      PonerPokemonType(res.data.types[0].type.name);
      PonerPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);
  //##########################################################
  //           H T M L
  //##########################################################

  //main display
  return (
    <div className="App">
        <header className="App-header">
            {/* menu hamburgesa*/}
            <div className="menu">
                <div className="menu-icon">
                    <div className="menu-hamburger"></div>
                    
                </div>
                <div className="menu-text">
                    <h1>Pokedex</h1>
                </div>
            </div>
            {/* end menu hamburgesa*/}
        </header> 


      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="enter pokemon name"
          />
        </label>
        <button>Get Pokemon</button>
      </form>
      {pokemonData.map((data) => {
        return (
          <section className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                <div className="divTableRow">
                  <div className="divTableCell">Number of Battles</div>
                  <div className="divTableCell">{data.game_indices.length+8}</div>
                </div>
              </div>
            </div>
          </section>

        );
      })}
    </div>
  );
};

export default App;