import {inject, Injectable} from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router)
  canActivate(): boolean {
    const uid = sessionStorage.getItem('uid');

    if (uid) {
      return true; // Permitir acceso si el UID está presente en el sessionStorage
    } else {
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión si el UID no está presente
      return false; // Bloquear acceso
    }
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
