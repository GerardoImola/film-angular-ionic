export interface MovieDbResponseResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};


export interface MovieFirebaseResponse {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  timestamp: Date;
};

export interface AddMovieFormI {
  originalTitle: string;
  overview: string;
  voteAverage: string;
  releaseDate: string;
}
