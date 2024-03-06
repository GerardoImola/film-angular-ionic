import {Injectable} from '@angular/core';
import {AddMovieFormI, MovieDbResponseResult} from "../interfaces/movie/movie.interface";
import {Observable, catchError} from 'rxjs';
import {AngularFirestore, DocumentData} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor( private firestore: AngularFirestore) {}

  urlBase = 'https://api.themoviedb.org/3/movie/';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8`,
    },
  };

  async getMovieList(uid: string): Promise<Array<MovieDbResponseResult>> {
    try {
      const response = await fetch(`${this.urlBase}popular?language=en-US&page=1`, this.options);
      const json = await response.json();

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

  getMoviesByUserId(): Observable<any> {
    const userId = sessionStorage.getItem('uid');

    return this.firestore.collection<any>('movies')
      .doc(userId!)
      .collection('detail', ref => ref.orderBy('timestamp', 'desc'))
      .valueChanges(); // Devuelve un Observable de las películas
  }

  getMovieById(uid: string, movieId: string): Observable<any> {
    return this.firestore
      .collection('movies')
      .doc(uid)
      .collection('detail')
      .doc(movieId)
      .get()
      .pipe(
        catchError((error) => {
          console.error('Error al obtener la película', error);
          throw error;
        })
      );
  }

  deleteMovie(uid: string, movieId: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('movies')
        .doc(uid)
        .collection('detail')
        .doc(movieId)
        .delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updateMovie(uid: string, movieId: string, updatedData: any): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('movies')
        .doc(uid)
        .collection('detail')
        .doc(movieId)
        .update(updatedData)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  addMovie(movie: AddMovieFormI): Observable<void> {
    return new Observable((observer) => {
      const userId = sessionStorage.getItem('uid');

      const newMovieData = {
        id: '', // autogenerate Firebase
        original_title: movie.originalTitle,
        poster_path: '',
        vote_average: movie.voteAverage,
        overview:  movie.overview,
        release_date: movie.releaseDate,
        timestamp: new Date(),
      };

      this.firestore
        .collection('movies')
        .doc(userId!)
        .collection('detail')
        .add(newMovieData)
        .then((docRef) => {
          docRef.update({ id: docRef.id });
          observer.next(); // Éxito
          observer.complete();
        })
        .catch((error) => {
          observer.error(error); // Error
        });
    });
  }
}
