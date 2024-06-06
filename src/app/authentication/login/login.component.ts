import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Login} from "../authentication";

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
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.min(3), Validators.max(32), Validators.required]),
    password: new FormControl('', [Validators.min(3), Validators.max(128), Validators.required])
  })

  login(): void {
    // Do authentication
    let loginData: Login = this.loginForm.value;

  }
}
