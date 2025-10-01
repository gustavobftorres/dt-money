import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { FormEvent, useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar transação"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}