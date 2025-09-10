import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "../services/pokeapi";
import { Button } from "@/components/ui/button"; // Shadcn UI button
import { typeColors } from "../utils/pokemonTypes";

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonByName(name!),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Carregando...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/">
        <Button className="mb-6">
          Voltar
        </Button>
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 text-black flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Imagem */}
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold capitalize mb-4">
            {data.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {data.types.map((t: any) => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${typeColors[t.type.name] || "bg-gray-500 text-white"
                  }`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 p-4 bg-gray-100 rounded-lg justify-center">
              <p className="font-semibold">Peso:</p>
              <p className="">{data.weight}</p>
            </div>
            <div className="flex gap-2 p-4 bg-gray-100 rounded-lg justify-center">
              <p className="font-semibold">Altura:</p>
              <p>{data.height}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
