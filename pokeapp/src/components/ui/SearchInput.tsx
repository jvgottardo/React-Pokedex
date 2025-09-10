import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  onSearch: (term: string) => void;
};

export function SearchInput({ onSearch }: Props) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (term.trim() !== "") onSearch(term.trim().toLowerCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex gap-2 mb-5 max-w-md mx-auto">
      <div className="relative flex-1">
        <Input
          placeholder="Pesquisar Pokémon..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <Button onClick={handleSearch}>Pesquisar</Button>
    </div>
  );
}
