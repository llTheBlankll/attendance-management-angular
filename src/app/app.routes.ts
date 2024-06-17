import { Routes } from '@angular/router';
import {AuthComponent} from "./authentication/login/auth.component";
import {authGuard} from "./guards/auth.guard";
import {ViewStudentComponent} from "./dashboard/attendance/view-student/view-student.component";
import {DashboardComponent} from "./dashboard/dashboard/dashboard.component";

export const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard]},
  { path: "dashboard/attendance/:studentId", component: ViewStudentComponent, canActivate: [authGuard]},
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "**", redirectTo: "dashboard"}
];
