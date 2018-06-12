import { Injectable } from '@angular/core';
import { authService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateExercisesGuard implements CanActivate {

  constructor(
    private auth: authService,
    private router: Router
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isSignedIn()) {
      console.log('on a un recours de l auth qui n est pas bonne ')
      console.log(this.auth)
      this.router.navigate(['/login']);
      return false;
    }
    //this.router.navigate(['/exercises']);
    return true;
  }

}