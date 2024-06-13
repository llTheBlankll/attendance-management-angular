import { Routes } from '@angular/router';
import {AuthComponent} from "./authentication/login/auth.component";
import {HomeComponent} from "./dashboard/home/home.component";
import {authGuard} from "./guards/auth.guard";
import {SectionsComponent} from "./dashboard/sections/sections.component";
import {StudentsComponent} from "./dashboard/students/students.component";
import {Roles} from "./enums/Roles";

// Get user role
const roleString = sessionStorage.getItem("role") ?? "GUEST";
const role: Roles = Roles[roleString as keyof typeof Roles];

export const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "dashboard", component: HomeComponent, canActivate: [authGuard]},
  { path: "dashboard/sections", component: SectionsComponent, canActivate: [authGuard]},
  { path: "dashboard/students", component: StudentsComponent, canActivate: [authGuard]},
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "**", redirectTo: "dashboard"}
];
