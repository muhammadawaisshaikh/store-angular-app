import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../auth.model';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role.enum';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required]],
      password: ['12345', [Validators.required]]
    })

    if (this.authService.checkAuthentication()) {
      this.router.navigateByUrl('/products');
    }
  }

  submitLogin() {
    let payload = this.loginForm.value;

    this.authService.login(payload).subscribe((res: any) => {
      let userDetails = res.find((u: User) => u?.email == payload.email && u?.password == payload.password);
      
      if (userDetails && Object.keys(userDetails)?.length > 0) {
        this.authService.isAuthenticated = true;
        this.authService.setUserSession(userDetails);
        
        let userRole = this.authService.getSessionUser().role;

        if (userRole == Role.Admin) {
          this.router.navigateByUrl('/products/listing');
        } else {
          this.router.navigateByUrl('/products');
        }

      } else {
        alert('User not Exist!')
      }
    })
  }

}
