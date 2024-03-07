import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { UserI } from '../interfaces/auth/user.interface';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, UserCredential,
} from 'firebase/auth';
import {getAuth } from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  async signUp(user: UserI): Promise<string> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.username, user.password);
      const userId = result!.user!.uid;

      await this.firestore.collection('users').doc(userId).set({
        email: user.username,
        password: user.password,
        uid: userId
      });

      // save to db
      this.firestore.collection('users').doc(userId).set(user);
      return userId;
    } catch (error: any) {

      throw error;
    }
  }

  async login(user: UserI): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(user.username, user.password);
      sessionStorage.setItem('uid', result.user!.uid);
    } catch (error: any) {
      throw error;
    }
  }


  signOut(): Promise<void> {
    sessionStorage.removeItem('uid');
    return this.afAuth.signOut();
  }


  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

}
