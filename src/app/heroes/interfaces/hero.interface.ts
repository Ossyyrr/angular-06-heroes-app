export interface Hero {
  alter_ego: string;
  characters: string;
  first_appearance: string;
  id: string;
  publisher: Publisher;
  superhero: string;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
