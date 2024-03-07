import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import { AddMovieFormI } from 'src/app/interfaces/movie/movie.interface';

@Component({
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.sass'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class AddMovieFormComponent  implements OnInit {
  @Output() addMovieEvent = new EventEmitter<AddMovieFormI>();

  movieForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      originalTitle: ['', Validators.required],
      overview: ['', Validators.required],
      voteAverage: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      releaseDate: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;
      this.addMovieEvent.emit(formData);
    }
  }

}
