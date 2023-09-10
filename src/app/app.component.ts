import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';
import { Role } from './enums/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'store-angular-app';
  mobileQuery: MediaQueryList;

  routes: any = [
    {
      name: 'Login',
      path: '/auth'
    },
    {
      name: 'Products',
      path: this.authService.getRole() == Role.Admin ? '/products/listing' : '/'
    },
  ]

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  navigateTo(snav: any, path :string) {
    this.router.navigateByUrl(path);
    snav.toggle()
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
