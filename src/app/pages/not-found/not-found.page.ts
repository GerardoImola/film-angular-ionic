import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.sass'],
  standalone: true,
  imports: [ IonicModule],


})
export class NotFoundPage implements OnInit {

  constructor(  private navCtrl: NavController
  ) { }

  ngOnInit() {
    console.log('not-found')
  }
  goHomePage() {
    this.navCtrl.navigateRoot('/login');

  }

  goBack() {
    console.log('goback')
    this.navCtrl.back();

  }
}
