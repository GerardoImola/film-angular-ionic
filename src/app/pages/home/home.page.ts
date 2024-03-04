import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ROUTE_EDIT_ABSOLUTE, ROUTE_LOGIN_ABSOLUTE} from "../../shared/routing-paths";
import {MovieService} from "../../services/movie.service";
import {MovieDbResponseResult} from "../../interfaces/movie/movie.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ CurrencyPipe, IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  private movieService = inject(MovieService)
  private router = inject(Router)
  stars: number[] = Array(5).fill(0);
  movies: Array<MovieDbResponseResult> = []
  showSearchBar: boolean = false;
  loadingMovies: boolean = true;
  async ngOnInit(): Promise<void> {
    await this.fetchMovies();
  }

  async fetchMovies(): Promise<void> {
    await this.movieService.getMovieList()
    this.movieService.movies$.subscribe((data) => {
      this.movies = data;
    });
    this.loadingMovies = false;
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

  editMovie(id: number) {
    this.router.navigate([ ROUTE_EDIT_ABSOLUTE, id]);
  }

  onLogout(): void {
    this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
  }

  openSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  onClearSearch() {
    this.showSearchBar = false;
  }

  onBackToLogin(): void {
    this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
  }
}
