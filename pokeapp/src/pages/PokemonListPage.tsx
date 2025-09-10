import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../services/pokeapi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cardTypeColors } from "@/utils/pokemonTypes";

export default function PokemonListPage() {
  const [page, setPage] = useState(1); // página inicial = 1
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page, limit),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  const startItem = (page - 1) * limit + 1;
  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (

    <div className="p-4">
      <div className="text-center p-5 pb-10">
        <h1 className="text-xl font-bold">Pokédex</h1>
      </div>
      <div className="max-w-4/5 mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {data?.pokemons.map((p: any) => {
            const mainType = p.types[0].type.name;
            const bgClass = cardTypeColors[mainType];

            return (
              <Link to={`/pokemon/${p.name}`} key={p.name} className="capitalize">
                <Card
                  className={`w-full transition-all duration-300 cursor-pointer ${bgClass} backdrop-blur-lg shadow-lg  border-none transform hover:scale-105`}
                >
                  <CardHeader className="flex justify-between">
                    <CardTitle className="capitalize drop-shadow-md">{p.name}</CardTitle>
                    <CardDescription className="drop-shadow-sm">#{p.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <div className="flex flex-col justify-center gap-2">
                      {p.types.map((t: any) => {
                        const typeName = t.type.name;
                        return (
                          <Badge key={typeName} className={`capitalize bg-white/40 text-white shadow-lg border border-white/30 backdrop-blur-lg`}>
                            {typeName}
                          </Badge>
                        );
                      })}
                    </div>
                    <div className="bg-white/50 rounded-full border border-white/30 backdrop-blur-lg">
                      <img
                        src={p.sprites.front_default}
                        alt={p.name}
                        className="h-full w-full drop-shadow-lg"
                      />
                    </div>

                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </ul>



        <div className="flex gap-5 w-full justify-center mt-10 align-baseline">
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </Button>

          <span className="self-center">
            {startItem} de {data?.total}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
