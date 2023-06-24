import React from "react";

type Props = {
  onChange: (newValue: string) => void;
};

const Search = ({ onChange }: Props) => {
  let searchTimeout: ReturnType<typeof setTimeout>;

  const doSearch = (query: string) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      onChange(query);
    }, 500);
  };

  return (
    <input
      onChange={(event) => doSearch(event.target.value)}
      type="text"
      placeholder="Ex: Charizard or 6"
      className="w-full py-2 px-4 focus:outline-none rounded"
    />
  );
};

export default Search;
