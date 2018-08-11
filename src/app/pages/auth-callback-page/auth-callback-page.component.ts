import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'mie-auth-callback-page',
  templateUrl: './auth-callback-page.component.html',
  styleUrls: ['./auth-callback-page.component.scss']
})
export class AuthCallbackPageComponent implements OnInit, OnDestroy {

  routeSubscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(params => {
      if (params.code) {
        this.apiService.getAuthToken(params.code)
          .map(result => {
            if (result.error) {
              this.router.navigateByUrl('/unauthorized');
            }
            return result;
          })
          .subscribe(response => {
            if (response.jwt) {
              this.authService.setToken(response.jwt);
              this.router.navigateByUrl(this.authService.getLastUrl() || '/');
            } else {
              this.router.navigateByUrl('/unauthorized');
            }
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
