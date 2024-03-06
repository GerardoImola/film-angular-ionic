import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {ROUTE_HOME_ABSOLUTE, ROUTE_LOGIN_ABSOLUTE} from "../../shared/routing-paths";
import {UserI} from "../../interfaces/auth/user.interface";
import {AuthUserFormComponent} from "../../components/auth-user-form/auth-user-form.component";
import { AuthService } from 'src/app/services/auth.service';
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  standalone: true,
  styleUrls: ['./create-account.page.sass'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, AuthUserFormComponent]

})
export class CreateAccountPage implements OnInit {
  username = '';
  password = '';
  loginForm!: FormGroup
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  private authService = inject(AuthService)
  private movieService = inject(MovieService)

  showPassword: boolean = false;
  showToast: boolean = false;
  messageToast: string = 'Account successfully created! Please login'
  messageType: string = 'success';
  isLoading: boolean = false

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onCreateAccount(user: UserI) {
    try {
      this.isLoading = true;
      const authUID = await this.authService.signUp(user);
      this.showToast = true;
      this.messageType = 'success';
      this.messageToast = 'Account successfully created! Please login';
      await this.movieService.getMovieList(authUID)
      setTimeout(() => {
        this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
      }, 1000)
    } catch (error: any) {
      this.messageToast = error.message
      this.messageType = 'error';
      this.showToast = true;
    } finally {
      this.isLoading = false;
    }

  }

  onBackToLogin(): void {
    this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
