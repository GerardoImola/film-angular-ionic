import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {UserI} from "../../interfaces/auth/user.interface";

@Component({
  selector: 'app-auth-user-form',
  templateUrl: './auth-user-form.component.html',
  styleUrls: ['./auth-user-form.component.sass'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthUserFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  @Output() submitAuth = new EventEmitter<UserI>();
  @Input() buttonText: string = 'Login';

  password = '';
  loginForm!: FormGroup
  showPassword: boolean = false;
  isLoading: boolean = false

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], password: ['', Validators.required],
    });
  }

  onClickSubmitForm(): void {
    const user: UserI = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.submitAuth.emit(user);
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.loginForm.reset();

    }, 3000);

    console.log('on submit');
    console.log(this.loginForm);
  }

  emitirEvento() {

  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
