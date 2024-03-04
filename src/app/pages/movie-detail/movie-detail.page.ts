import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {MovieDbResponseResult} from "../../interfaces/movie/movie.interface";
import {MovieDetailDbResponse} from "../../interfaces/movie/movie-detail-response.interface";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  standalone: true,
  styleUrls: ['./movie-detail.page.scss'],
  imports: [ CurrencyPipe, IonicModule, CommonModule, FormsModule],

})
export class MovieDetailPage implements OnInit {
  private route = inject(ActivatedRoute)
  private movieService = inject(MovieService)

  currentRating: number = 0;
  currentDate: Date;
  movie!: MovieDetailDbResponse;
  loadingData: boolean = true;

  constructor() {
    this.currentDate = new Date();
  }
  rate(rating: number) {
    console.log('Rated:', rating);
    this.currentRating = rating;
  }
  stars: number[] = Array(5).fill(0);

  resultMovieDetail: Array<MovieDbResponseResult> = []

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let movieId = params.get('id');
      this.fetchMovieById(Number(movieId))
    });  }

    async fetchMovieById(id: number): Promise<void> {
      this.movie = await this.movieService.getMovieById(id)
      this.loadingData = false;

      console.log('resultMovieDetail', this.movie)

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
    return Array.from({ length: this.stars.length }, (_, index) => index);
  }

  editMovie() {
    console.log('editar')
  }

  deleteMovie()  {
    console.log('eliminar')
  }
}
