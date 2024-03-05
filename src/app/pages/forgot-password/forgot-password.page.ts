import {Component, inject, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {ROUTE_LOGIN_ABSOLUTE} from "../../shared/routing-paths";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormsModule} from "@angular/forms";
import {UserI} from "../../interfaces/auth/user.interface";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  standalone: true,
  styleUrls: ['./forgot-password.page.scss'],
  imports: [IonicModule, FormsModule]

})
export class ForgotPasswordPage implements OnInit {
  private router = inject(Router)
  private authService = inject(AuthService);
  email: string = ''
  forgotPassword: boolean = false;
  messagePasswordToast: string = 'Password recovery email sent.'
  messageType: string = 'success';


  ngOnInit() {
    console.log('forgotPassword')
  }

  onBackToLogin(): void {
    this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
  }
  async onReset(): Promise<void> {
    try {
      await this.authService.resetPassword(this.email);
      this.forgotPassword = true;
      this.messagePasswordToast = 'Password recovery email sent.';
      this.messageType = 'success';
      console.log('Correo electrónico de recuperación de contraseña enviado.');
    } catch (error: any) {
      this.forgotPassword = true;
      this.messagePasswordToast = error.message;
      this.messageType = 'error';
      console.error('Error al enviar el correo electrónico de recuperación de contraseña:', error);
    }
  }
}
