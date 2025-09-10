import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function fetchPokemons(page: number, limit = 12) {
  const offset = (page - 1) * limit;
 // pega a lista resumida
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);

  // faz requests paralelos para pegar os detalhes
  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await api.get(pokemon.url);
      return res.data; // aqui já vem TUDO (id, sprites, stats, etc)
    })
  );

    return {
    pokemons: detailedPokemons,
    total: data.count, 
  };
}

export async function fetchPokemonByName(name: string) {
  const { data } = await api.get(`/pokemon/${name}`);
  return data;
}
