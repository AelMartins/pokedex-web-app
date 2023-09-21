import React, { useState, useEffect } from "react";
import { searchPokemon } from "../api";

const PokeCard = () => {
  // State para armazenar o nome do Pokémon pesquisado
  const [search, setSearch] = useState("ditto");

  // State para armazenar os dados do Pokémon pesquisado
  const [pokemon, setPokemon] = useState(null);

  // State para armazenar a tipagem do Pokémon pesquisado
  const [type, setType] = useState(null);

  // State para controlar o estado de carregamento
  const [loading, setLoading] = useState(false);

  // useEffect é usado para buscar os dados do Pokémon quando o componente é montado
  useEffect(() => {
    fetchData(); // Chamada inicial para carregar os dados padrão
  }, []); // De forma bem resumida, o array vazio, usado desta forma, evita que o código (pesquisar nome do pokemon) seja repetido desnecessáriamente

  // Função para buscar dados do Pokémon
  const fetchData = async () => {
    try {
      setLoading(true); // Ativa o estado de carregamento

      // Busca os dados do Pokémon com base no nome fornecido
      const pokemonData = await searchPokemon(search);
      if (!pokemonData) {
        throw new Error("Dados do Pokémon não encontrados");
      }
      if (pokemonData.pokemon) {
        setPokemon(pokemonData.pokemon); // Atualiza o estado do Pokémon
      }
      if (pokemonData.types) {
        setType(pokemonData.types); // Puxa os dados da URL de cada tipo do pokemon
      }

      setLoading(false); // Desativa o estado de carregamento
    } catch (error) {
      console.error("Erro ao buscar o Pokémon ou tipo:", error);
      setLoading(false); // Desativa o estado de carregamento em caso de erro
    }
  };

  // Manipulador para a mudança de entrada de pesquisa
  const onInputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  // Manipulador para o clique no botão de pesquisa
  const onButtonClickHandler = () => {
    fetchData(); // Inicia uma nova busca quando o botão é clicado
  };

  // Renderização do componente
  return (
    <>
      <div>
        <h1>POKEDEX</h1>
      </div>
      <div className="searchbar-container">
        <div className="searchbar">
          <input
            placeholder="BUSCAR POKEMON"
            value={search}
            onChange={onInputChangeHandler}
          />
        </div>
        <div className="searchbar-btn">
          <button onClick={onButtonClickHandler}>BUSCAR</button>
        </div>
        {loading && <p>Carregando...</p>}{" "}
        {/* Exibe uma mensagem de carregamento quando o estado de carregamento é verdadeiro */}
        {pokemon && (
          <div>
            {/* Exibe informações sobre o Pokémon */}
            <div>ID: {pokemon.id}</div>
            <img
              src={
                pokemon.sprites.versions["generation-v"]["black-white"].animated
                  .front_default
              }
              alt={pokemon.name}
            />
            <div>{pokemon.name}</div>
            <div>
              {pokemon.types.map((type) => type.type.name).join(" AND ")}
            </div>
            <div>ALTURA = {pokemon.height / 10} m</div>
            <div>PESO = {pokemon.weight / 10} Kg</div>
          </div>
        )}
        {type && type.length > 0 && (
          <div>
            {/* Exibe informações sobre os tipos do Pokémon */}
            <div>
              FRAQUEZAS |{" "}
              {type
                .flatMap((t) => t.damage_relations.double_damage_from)
                .map((type) => type.name)
                .join(" | ")}
            </div>
            <div>
              INEFICAZ CONTRA |{" "}
              {type
                .flatMap((t) => t.damage_relations.half_damage_to)
                .map((type) => type.name)
                .join(" | ")}
            </div>
            <div>
              IMUNE A |{" "}
              {type
                .flatMap((t) => t.damage_relations.no_damage_from)
                .map((type) => type.name)
                .join(" | ")}
            </div>
            <div>
              EFICAZ CONTRA |{" "}
              {type
                .flatMap((t) => t.damage_relations.double_damage_to)
                .map((type) => type.name)
                .join(" | ")}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PokeCard;
