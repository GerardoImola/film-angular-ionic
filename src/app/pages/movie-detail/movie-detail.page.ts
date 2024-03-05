import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {MovieDbResponseResult} from "../../interfaces/movie/movie.interface";
import {MovieDetailDbResponse} from "../../interfaces/movie/movie-detail-response.interface";
import { Subscription } from 'rxjs';
import {ROUTE_HOME_ABSOLUTE} from "../../shared/routing-paths";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  standalone: true,
  styleUrls: ['./movie-detail.page.scss'],
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
    this.movie = await this.movieService.getMovieById(id)
    this.titleMovie = this.movie.original_title;
    this.originalTitleMovie = this.movie.original_title;
    this.originalOverviewMovie = this.movie.overview;
    this.overviewMovie = this.movie.overview;
    this.loadingData = false;
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

  async onDeleteMovie(position: 'top') {
    let allMovies!: Array<MovieDbResponseResult>;
    this.moviesSubscription = this.movieService.movies$.subscribe((data) => {
      allMovies = data;
    });
    const newMovies = allMovies.filter(movie => movie.id !== this.movieId)
    this.movieService.updateMovies([...newMovies]);
    this.router.navigate([ROUTE_HOME_ABSOLUTE]);

    const toast = await this.toastController.create({
      message: 'Movie successfully eliminated!',
      duration: 2500,
      position: position,
    });
    await toast.present();

  }

  async onConfirmChanges(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Confirmed changes',
      duration: 2500,
      position: position,
      color:"success"

    });
    await toast.present();
  }

  onCancelEdit() {
    this.overviewMovie = this.originalOverviewMovie;
    this.titleMovie = this.originalTitleMovie
    this.editMovie = !this.editMovie;

  }
}
