import {Component, inject, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {ROUTE_LOGIN_ABSOLUTE} from "../../shared/routing-paths";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  standalone: true,
  styleUrls: ['./forgot-password.page.scss'],
  imports: [IonicModule]

})
export class ForgotPasswordPage implements OnInit {
  private router = inject(Router)

  constructor() { }

  ngOnInit() {
    console.log('forgotPassword')
  }
  onBackToLogin(): void {
    this.router.navigate([ROUTE_LOGIN_ABSOLUTE]);
  }

}
