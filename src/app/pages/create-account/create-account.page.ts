import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {ROUTE_HOME_ABSOLUTE, ROUTE_LOGIN_ABSOLUTE} from "../../shared/routing-paths";
import {UserI} from "../../interfaces/auth/user.interface";
import {AuthUserFormComponent} from "../../components/auth-user-form/auth-user-form.component";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  standalone: true,
  styleUrls: ['./create-account.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, AuthUserFormComponent]

})
export class CreateAccountPage implements OnInit {
  username = '';
  password = '';
  loginForm!: FormGroup
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  showPassword: boolean = false;
  showToast: boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onCreateAccount(user: UserI) {
    console.log('Creare accoint: ', user)
    this.showToast = true;
    setTimeout(() => {
      this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
    }, 1000)
  }

  onBackToLogin(): void {
    this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
