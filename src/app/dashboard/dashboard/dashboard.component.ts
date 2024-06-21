import {Component, inject} from '@angular/core';
import {SideNavigationComponent} from "../../components/side-navigation/side-navigation.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationLinks} from "../../enums/NavLinks";
import {TeacherDashboardComponent} from "../teacher/teacher-dashboard/teacher-dashboard.component";
import {AdminDashboardComponent} from "../admin/admin-dashboard/admin-dashboard.component";
import {Roles} from "../../enums/Roles";
import {AttendanceComponent} from "../attendance/attendance.component";
import {AnnouncementsComponent} from "../announcements/announcements.component";
import {TeacherStudentsComponent} from "../teacher/teacher-students/teacher-students.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideNavigationComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    AttendanceComponent,
    AnnouncementsComponent,
    TeacherStudentsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // Injections
  protected router: Router = inject(Router);

  // Side Navigations data
  selectedNavigation: NavigationLinks = NavigationLinks.DASHBOARD;
  sectionSelected = 0;

  // Get Role
  protected roleString = sessionStorage.getItem("role") ?? "GUEST";
  protected role: Roles = Roles[this.roleString as keyof typeof Roles];

  constructor() { }

  onNavigationSelected(navigation: string): void {
    this.selectedNavigation = navigation as NavigationLinks;
  }

  onSectionSelected(sectionId: number) {
    this.sectionSelected = sectionId;
  }

  protected readonly NavigationLinks = NavigationLinks;
  protected readonly Roles = Roles;
}
