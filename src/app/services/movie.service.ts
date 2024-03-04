import {inject, Injectable} from '@angular/core';
import {MovieDbResponseResult} from "../interfaces/movie/movie.interface";
import {MovieDetailDbResponse} from "../interfaces/movie/movie-detail-response.interface";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  urlBase = 'https://api.themoviedb.org/3/movie/';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8`,
    },
  };
  async getMovieList(): Promise<Array<MovieDbResponseResult>>{
    try {
      const response = await fetch(`${this.urlBase}popular?language=en-US&page=1`, this.options);
      const json = await response.json();
      return json.results;
    } catch (e) {
      throw new Error('Error fetching movies: ' + e);
    }
  }

  async getMovieById(id: number): Promise<MovieDetailDbResponse> {
    let creditsUrl = 'language=en-US&append_to_response=credits'
    const url = `${this.urlBase}${id}?${creditsUrl}`;

    try {
      const response = await fetch(url, this.options);
      const json = await response.json();
      return json;
    } catch (e: unknown) {
      throw new Error('Error fetching movie by id: ' + e);
    }
  }


}
