import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav} from "@angular/material/sidenav";
import {MatList, MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {TopHeaderComponent} from "../top-header/top-header.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import 'chartjs-adapter-moment';
import {MatLine} from "@angular/material/core";
import {AnnouncementsComponent} from "../../dashboard/announcements/announcements.component";
import {TeacherDashboardComponent} from "../../dashboard/teacher/teacher-dashboard/teacher-dashboard.component";
import {TeacherStudentsComponent} from "../../dashboard/teacher/teacher-students/teacher-students.component";
import {TeacherSectionComponent} from "../../dashboard/teacher/teacher-section/teacher-section.component";
import {AdminTeachersComponent} from "../../dashboard/admin/admin-teachers/admin-teachers.component";
import {AdminStrandsComponent} from "../../dashboard/admin/admin-strands/admin-strands.component";
import {AdminStudentsComponent} from "../../dashboard/admin/admin-students/admin-students.component";
import {AdminSectionsComponent} from "../../dashboard/admin/admin-sections/admin-sections.component";
import {AdminDashboardComponent} from "../../dashboard/admin/admin-dashboard/admin-dashboard.component";
import {AttendanceComponent} from "../../dashboard/attendance/attendance.component";
import {NavigationLinks} from "../../enums/NavLinks";

enum Roles {
  ADMIN,
  TEACHER,
  GUEST
}


interface SideNavLink {
  icon: string;
  title: string;
  routerLink?: string;
  userRoles?: Roles[];
}

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    MatGridList,
    MatDrawerContainer,
    MatDrawer,
    MatSidenav,
    MatNavList,
    RouterLinkActive,
    MatListItem,
    RouterLink,
    MatDrawerContent,
    MatIcon,
    MatGridTile,
    MatList,
    NgOptimizedImage,
    MatDivider,
    TopHeaderComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    NgClass,
    MatLine,
    MatListItemIcon,
    TeacherDashboardComponent,
    TeacherStudentsComponent,
    TeacherSectionComponent,
    AnnouncementsComponent,
    AdminTeachersComponent,
    AdminStrandsComponent,
    AdminStudentsComponent,
    AdminSectionsComponent,
    AdminDashboardComponent,
    AttendanceComponent
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css'
})
export class SideNavigationComponent implements OnInit {

  // Injections
  protected router: Router = inject(Router);
  protected activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Get Role
  protected roleString = sessionStorage.getItem("role") ?? "GUEST";
  protected role: Roles = Roles[this.roleString as keyof typeof Roles];

  @Output()
  public selectedNavigation: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public sectionSelected: EventEmitter<number> = new EventEmitter<number>();

  public sidenavLinks: Array<SideNavLink> = [
    {icon: 'dashboard', title: 'Dashboard', routerLink: '/dashboard/admin', userRoles: [Roles.ADMIN]},
    {icon: 'dashboard', title: 'Dashboard', routerLink: '/dashboard/teacher', userRoles: [Roles.TEACHER]},
    {
      icon: 'campaign',
      title: 'Announcements',
      routerLink: '/dashboard/announcements',
      userRoles: [Roles.ADMIN, Roles.TEACHER]
    },
    {
      icon: "person_add",
      title: (this.role == Roles.TEACHER) ? 'Your Students' : 'Students',
      routerLink: '/dashboard/students',
      userRoles: [Roles.ADMIN, Roles.TEACHER]
    },
    {
      icon: "list",
      title: (this.role == Roles.TEACHER) ? 'Your Section' : 'Sections',
      routerLink: '/dashboard/sections',
      userRoles: [Roles.ADMIN, Roles.TEACHER]
    },
    {
      icon: "calendar_month", title: "Attendance", userRoles: [Roles.ADMIN, Roles.TEACHER]
    },
    {icon: "stacks", title: 'Strands', userRoles: [Roles.ADMIN]},
    {icon: "person", title: 'Teachers', userRoles: [Roles.ADMIN]},
    {icon: "book", title: 'Subjects', userRoles: [Roles.ADMIN]},
    {icon: "calendar_today", title: 'Schedules', userRoles: [Roles.ADMIN]},
    {icon: "report", title: 'Reports', userRoles: [Roles.ADMIN, Roles.TEACHER]},
  ]

  ngOnInit(): void {
    // Check if studentId param from the url is defined.
    this.activatedRoute.params.subscribe((params) => {
      if (params['studentId'] !== undefined) {
        console.log("Student ID: " + params['studentId']);
        this.router.navigate(["/dashboard/attendance/", params["studentId"]]).then(_ => console.log("Navigated to attendance page of student"));
      }
    });

    // Check if the user is logged in
    if (this.role == Roles.GUEST) {
      this.router.navigate(['/login']).then(_ => console.log("Navigated to login page"));
    } else if (this.role == Roles.TEACHER) {
      // If teacher, get the teacher's section
      // Get teacher id from session storage
      // let teacherId = Number(sessionStorage.getItem("user_id"));
      //
      // this.sectionService.getTeacherSections(teacherId).subscribe((response) => {
      //   console.log(response);
      // });
    }
  }

  onSectionSelected(sectionSelected: number) {
    console.log("Section selected: " + sectionSelected);
    this.sectionSelected.emit(sectionSelected);
  }

  protected readonly NavigationLinks = NavigationLinks;
}
