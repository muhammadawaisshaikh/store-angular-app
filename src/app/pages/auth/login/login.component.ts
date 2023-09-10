import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../auth.model';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    if (this.authService.checkAuthentication()) {
      this.rolebasedRoute();
    }
  }

  submitLogin() {
    let payload = this.loginForm.value;

    this.authService.login(payload).subscribe((res: any) => {
      let userDetails = res.find((u: User) => u?.email == payload.email && u?.password == payload.password);
      
      if (userDetails && Object.keys(userDetails)?.length > 0) {
        this.authService.isAuthenticated = true;
        this.authService.setUserSession(userDetails);
        
        this.rolebasedRoute();
      } else {
        this._snackBar.open('User not Exist!', 'close');
      }
    })
  }

  rolebasedRoute() {
    let userRole = this.authService.getSessionUser().role;

    if (userRole == Role.Admin) {
      this.router.navigateByUrl('/products/listing');
    } else {
      this.router.navigateByUrl('/products');
    }
  }

}
