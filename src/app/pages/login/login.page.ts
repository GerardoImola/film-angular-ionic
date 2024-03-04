import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {ROUTE_HOME_ABSOLUTE, ROUTE_CREATE_ABSOLUTE, ROUTE_FORGOT_ABSOLUTE} from "../../shared/routing-paths";
import {AuthUserFormComponent} from "../../components/auth-user-form/auth-user-form.component";
import {UserI} from "../../interfaces/auth/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, AuthUserFormComponent]
})
export class LoginPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  username = '';
  password = '';
  loginForm!: FormGroup
  showPassword: boolean = false;
  showToast: boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginForm(user: UserI) {
    console.log('HERE , GO!', user)
    this.router.navigate([ROUTE_HOME_ABSOLUTE]);
    // this.showToast = true
  }

  create() {
    this.router.navigate([ROUTE_CREATE_ABSOLUTE]);

  }

  forgot() {
    this.router.navigate([ ROUTE_FORGOT_ABSOLUTE]);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
