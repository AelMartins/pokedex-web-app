// Função genérica para fazer chamadas à API
const fetchApiData = async (url) => {
  try {
    // Faz uma requisição à API usando a URL fornecida
    const response = await fetch(url);

    // Verifica se a resposta da API está OK (código de status 200)
    if (!response.ok) {
      throw new Error("Erro na requisição à API");
    }

    // Converte a resposta em formato JSON e a retorna
    return await response.json();
  } catch (error) {
    // Captura erros, registra-os no console e lança a exceção novamente para tratamento externo
    throw error;
  }
};

// Função para buscar dados de um Pokémon na API
export const searchPokemon = async (pokemon) => {
  try {
    // Cria a URL da API com base no nome do Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    // Chama a função fetchApiData para buscar os dados do Pokémon
    const pokemonData = await fetchApiData(url);

    // Verifica se há informações sobre os tipos do Pokémon
    if (pokemonData.types && pokemonData.types.length > 0) {
      // Para cada tipo, busca informações adicionais
      const typePromises = pokemonData.types.map((typeInfo) => {
        return fetchApiData(typeInfo.type.url);
      });

      // Aguarda todas as chamadas de busca e armazena os resultados em typeData
      const typeData = await Promise.all(typePromises);
      // Retorna um objeto com os dados do Pokémon e seus tipos
      return { pokemon: pokemonData, types: typeData };
    } else {
      // Se não houver tipos, retorna um objeto com os dados do Pokémon e uma lista vazia
      return {
        pokemon: pokemonData,
        types: [],
      };
    }
  } catch (error) {
    // Captura erros, registra-os no console e lança a exceção novamente para tratamento externo
    console.log("Erro ao buscar o Pokémon:", error);
    throw error;
  }
};
