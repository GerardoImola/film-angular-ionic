export interface MovieDetailDbResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Array<IGenres>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<IProductionCompanies>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<ISpokenLanguages>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: any;
};

interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};

interface IGenres {
  id: number;
  name: string;
};

interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

interface ISpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
};
