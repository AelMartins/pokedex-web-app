import React from "react";
import { searchPokemon } from "./api";
import "./App.css";
import PokeCard from "./components/pokeCard";

function App() {

  const onSearchHandler = async (pokemon) => {
    const result = await searchPokemon(pokemon)
    console.log("pokemon", result)
  }

  return (
    <>
      <PokeCard 
        onSearch={onSearchHandler}
      />
      <div className="App"></div>
    </>
  );
}

export default App;
