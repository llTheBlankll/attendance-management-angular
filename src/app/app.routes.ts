import { Routes } from '@angular/router';
import {AuthComponent} from "./authentication/login/auth.component";
import {HomeComponent} from "./dashboard/home/home.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "dashboard", component: HomeComponent, canActivate: [authGuard]},
];
