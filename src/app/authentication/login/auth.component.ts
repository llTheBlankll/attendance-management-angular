import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {LoginDTO, LoginToken} from '../../DTO/DTOList';
import {catchError, map, of} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TeacherService} from "../../services/teacher/teacher.service";
import {Roles} from "../../enums/Roles";
import {Teacher} from "../../DTO/TeacherDTO";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatGridList,
    MatSlideToggle,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCardHeader,
    MatHint,
    MatTooltip,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  teacherService: TeacherService = inject(TeacherService);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(32), Validators.required]),
    password: new FormControl('', [Validators.minLength(5), Validators.maxLength(128), Validators.required])
  });

  constructor(private loginService: AuthService, private alert: MatSnackBar, private router: Router) {
    this.loginService = loginService;
  }

  invalidCredentials(): void {
    this.alert.open("Username or Password is Incorrect", "Close");
  }

  saveUserInfo(loginToken: LoginToken): void {
    // Save user info to session storage
    sessionStorage.setItem("token", loginToken.token);
    sessionStorage.setItem("username", loginToken.username);
    sessionStorage.setItem("role", loginToken.role.toString());
    sessionStorage.setItem("expiration", loginToken.expiration);
    sessionStorage.setItem("user_id", loginToken.user.id.toString())
  }

  login(): void {
    // Do authentication
    const loginData: LoginDTO = this.loginForm.value;
    if (loginData.username.length < 32) {
      console.log("Logging in");
      // Check if status code 200
      this.loginService.login(loginData).pipe(
        map((response: HttpResponse<any>) => {
          console.log("Login successful");
          // Get token
          const loginToken: LoginToken = response.body;

          // Show alert message
          this.alert.open("Login successful", "Close");

          // Save user info to session storage
          this.saveUserInfo(loginToken);

          // Redirect to side-navigation page.
          const role = Roles[loginToken.role as unknown as keyof typeof Roles];
          if (role == Roles.ADMIN) {
            console.log("Redirecting to admin dashboard");
            this.router.navigate(["/dashboard"]).then(_ => console.log("Redirected to admin dashboard"));
          } else if (role == Roles.TEACHER) {
            console.log("Redirecting to teacher dashboard");
            this.redirectToTeacherDashboard(loginToken);
          } else {
            console.error("Invalid role: " + loginToken.role);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.invalidCredentials();
          }
          return of(null);
        })
      ).subscribe();
    } else {
      // Show error message
      this.alert.open("Invalid credentials", "Close");
    }
  }

  redirectToTeacherDashboard(loginToken: LoginToken): void {
    this.teacherService.getTeacherByUserId(loginToken.user.id).subscribe((response: HttpResponse<Teacher>) => {
      console.log("Getting teacher by user id");
      if (response.status === 200 && response.body != null) {
        const teacher: Teacher = response.body;
        sessionStorage.setItem("teacher_id", teacher.id.toString());
      }
      this.router.navigate(["/dashboard"]).then(_ => console.log("Redirected to teacher dashboard"));
    });
  }
}
