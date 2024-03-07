import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ROUTE_EDIT_ABSOLUTE, ROUTE_LOGIN_ABSOLUTE} from "../../shared/routing-paths";
import {MovieService} from "../../services/movie.service";
import {AddMovieFormI, MovieDbResponseResult, MovieFirebaseResponse} from "../../interfaces/movie/movie.interface";
import { AuthService } from 'src/app/services/auth.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AddMovieFormComponent } from 'src/app/components/add-movie-form/add-movie-form.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.sass'],
  standalone: true,
  imports: [ CurrencyPipe, IonicModule, CommonModule, FormsModule, AddMovieFormComponent],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private movieService = inject(MovieService)
  private router = inject(Router)
  private authService = inject(AuthService);
  stars: number[] = Array(5).fill(0);
  movies: Array<MovieFirebaseResponse> = []
  moviesFilter: Array<MovieFirebaseResponse> = []
  showSearchBar: boolean = false;
  loadingMovies: boolean = true;
  noResultsFound: boolean = false;

  async ngOnInit(): Promise<void> {
    await this.fetchMovies();
  }

  async fetchMovies(): Promise<void> {
    this.movieService.getMoviesByUserId().subscribe(movies => {
      this.movies = movies;
      this.loadingMovies = false;
      this.moviesFilter = this.movies
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
    return Array.from({ length: this.stars.length }, (_, index) => index);
  }

  editMovie(id: number) {
    this.router.navigate([`${ROUTE_EDIT_ABSOLUTE}/${id}`]);
  }

  onLogout(): void {
    try {
      this.authService.signOut()
      this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  openSearch() {
    this.showSearchBar = !this.showSearchBar;
  }


  onClearSearch() {
    this.showSearchBar = false;
    this.movies = this.moviesFilter;
    this.noResultsFound = this.movies.length === 0;
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!filterValue) {
      this.movies = this.moviesFilter;
      return
    }
    this.movies = this.moviesFilter.filter(movie =>
      movie.original_title.toLowerCase().includes(filterValue)
    );

    this.noResultsFound = this.movies.length === 0;
  }

  onCancelMovie() {
    this.modal.dismiss(null, 'cancel');
  }

  onConfirmAddMovie(formData: AddMovieFormI) {
    console.log(formData)
    // this.modal.dismiss('this.name', 'confirm');
    this.movieService.addMovie(formData).subscribe(
      () => {
        console.log('Película agregada exitosamente');
        this.modal.dismiss(null, 'cancel');
      },
      (error) => {
        console.error('Error al agregar la película', error);
      }
    );

  }
}
