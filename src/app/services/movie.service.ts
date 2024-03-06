import {Injectable} from '@angular/core';
import {MovieDbResponseResult} from "../interfaces/movie/movie.interface";
import {MovieDetailDbResponse} from "../interfaces/movie/movie-detail-response.interface";
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor( private firestore: AngularFirestore) {}

  private dataSubject = new BehaviorSubject<Array<MovieDbResponseResult>>([]);
  movies$ = this.dataSubject.asObservable();
  urlBase = 'https://api.themoviedb.org/3/movie/';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8`,
    },
  };

  updateMovies(data: any[]) {
    this.dataSubject.next(data);
  }

  async getMovieList(uid: string): Promise<Array<MovieDbResponseResult>>{
    try {
      const response = await fetch(`${this.urlBase}popular?language=en-US&page=1`, this.options);
      const json = await response.json();
      this.updateMovies(json.results)

      if (uid) {
        const batch = this.firestore.firestore.batch();
        // save movies in DB
        await json.results.forEach( async (movie: MovieDbResponseResult) => {
          await this.firestore.collection('movies').doc(uid).collection('detail').doc(movie.id.toString())
            .set({
              id: movie.id,
              original_title: movie.original_title,
              poster_path: movie.poster_path,
              vote_average: movie.vote_average,
              overview: movie.overview,
              release_date: movie.release_date,
              timestamp: new Date(),
            });
        });

        await batch.commit();
      }
      return json.results;
    } catch (e) {
      throw new Error('Error fetching movies: ' + e);
    }
  }

  getMoviesByUserId(): Observable<any []> {
    const userId = sessionStorage.getItem('uid');

    return this.firestore.collection<any>('movies')
      .doc(userId!)
      .collection('detail')
      .valueChanges(); // Devuelve un Observable de las películas
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
