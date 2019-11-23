import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        //If true is returned that means Route is accessible
        // If false is returned that means route is blocked and is redirected to login page 

        if (!this.authService.getToken()) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
        return true;
    }
}