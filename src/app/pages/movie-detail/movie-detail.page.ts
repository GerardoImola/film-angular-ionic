import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {MovieDbResponseResult} from "../../interfaces/movie/movie.interface";
import {MovieDetailDbResponse} from "../../interfaces/movie/movie-detail-response.interface";
import { catchError, Subscription } from 'rxjs';
import {ROUTE_HOME_ABSOLUTE} from "../../shared/routing-paths";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  standalone: true,
  styleUrls: ['./movie-detail.page.sass'],
  imports: [ CurrencyPipe, IonicModule, CommonModule, FormsModule],

})
export class MovieDetailPage implements OnInit, OnDestroy {
  constructor(private toastController: ToastController) {
  }

  private route = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private moviesSubscription!: Subscription;
  private router = inject(Router)

  movieId!: number;
  movie!: MovieDetailDbResponse;
  loadingData: boolean = true;
  editMovie: boolean = false;
  titleMovie: string = '';
  overviewMovie: string = '';
  originalOverviewMovie: string = ''
  originalTitleMovie: string = ""
  stars: number[] = Array(5).fill(0);

  resultMovieDetail: Array<MovieDbResponseResult> = []

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id'));
      this.fetchMovieById(this.movieId)
    });
  }

  ngOnDestroy(): void {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }

  async fetchMovieById(id: number): Promise<void> {
    const uid = sessionStorage.getItem('uid');

    this.movieService.getMovieById(uid!, id.toString())
    .pipe(
      catchError((error) => {
        console.error('Error al obtener la película', error);
        return [];
      })
    )
    .subscribe((movie) => {
      console.log('Película obtenida exitosamente', movie.data());
      this.movie = movie.data();
      this.titleMovie = this.movie.original_title;
      this.originalTitleMovie = this.movie.original_title;
      this.originalOverviewMovie = this.movie.overview;
      this.overviewMovie = this.movie.overview;
      this.loadingData = false;
    });
  }

  getStarIcon(index: number, ratingPercentage: number): string {
    const percentagePerStar = 10 / this.stars.length;
    const starPercentage = index * percentagePerStar;

    if (starPercentage < ratingPercentage) {
      return 'star';
    } else {
      return 'star-outline';
    }
  }

  get starIndexes(): number[] {
    return Array.from({length: this.stars.length}, (_, index) => index);
  }

  onEditMovie() {
    this.editMovie = !this.editMovie;
    this.overviewMovie = this.originalOverviewMovie;
    this.titleMovie = this.originalTitleMovie
  }

  async onDeleteMovie() {
    const uid = sessionStorage.getItem('uid');

    await this.movieService.deleteMovie(uid!, this.movieId.toString())
    .pipe(
      catchError(async () => {
        const toast = await this.toastController.create({
          message: 'Something bad has happened. Try again!',
          duration: 2500,
          position: 'top',
        });
        await toast.present();
      })
    )
      .subscribe(async () => {
          this.router.navigate([ROUTE_HOME_ABSOLUTE]);
          const toast = await this.toastController.create({
            message: 'Movie successfully eliminated!',
            duration: 2500,
            position: 'top',
          });
          await toast.present();
      });
  }

  async onConfirmChanges(position: 'top') {

    this.editMovie = !this.editMovie;
    const uid = sessionStorage.getItem('uid');
    const updatedData = {
      overview: this.overviewMovie,
      original_title: this.titleMovie,
    };

    this.movieService.updateMovie(uid!, this.movieId.toString(), updatedData)
    .pipe(
      catchError(async () => {
        const toast = await this.toastController.create({
          message: 'Something bad has happened. Try again!',
          duration: 2500,
          position: 'top',
        });
        await toast.present();
      })
    )
    .subscribe(async() => {
      const toast = await this.toastController.create({
        message: 'Movie updated',
        duration: 2500,
        position: position,
        color:"success"
      });
      await toast.present();
    });
  }

  onCancelEdit() {
    this.overviewMovie = this.originalOverviewMovie;
    this.titleMovie = this.originalTitleMovie
    this.editMovie = !this.editMovie;

  }
}
