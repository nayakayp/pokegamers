type EvolutionTreeNode = {
  species: EvolutionSpecies;
  evolves_to: EvolutionTreeNode[];
};

type EvolutionSpecies = {
  name: string;
  url: string;
};

export function reformatEvolutionChain(chain: EvolutionTreeNode, result: EvolutionSpecies[] = []) {
  const { species, evolves_to } = chain;

  const evolution = {
    name: species.name,
    url: species.url,
  };

  result.push(evolution);

  evolves_to.map((evolve) => {
    reformatEvolutionChain(evolve, result);
  });

  return result;
}

export function reformatPokemonMoveName(input: string): string {
  const words = input.split('-');

  const formattedWords = words.map((word) => {
    const firstChar = word.charAt(0).toUpperCase();
    const restOfString = word.slice(1);
    return `${firstChar}${restOfString}`;
  });

  return formattedWords.join(' ');
}