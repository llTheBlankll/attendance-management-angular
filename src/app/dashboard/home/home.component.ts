import {Component, inject, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav} from "@angular/material/sidenav";
import {MatList, MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {TopNavigationComponent} from "../../components/top-navigation/top-navigation.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import 'chartjs-adapter-moment';
import {AdminDashboardComponent} from "../../components/admin/admin-dashboard/admin-dashboard.component";
import {MatLine} from "@angular/material/core";
import {StudentsComponent} from "../students/students.component";
import {SectionsComponent} from "../sections/sections.component";
import {TeacherDashboardComponent} from "../../components/teacher/teacher-dashboard/teacher-dashboard.component";
import {TeacherStudentsComponent} from "../../components/teacher/teacher-students/teacher-students.component";
import {TeacherSectionComponent} from "../../components/teacher/teacher-section/teacher-section.component";
import {AnnouncementsComponent} from "../../components/announcements/announcements.component";
import {AdminTeachersComponent} from "../../components/admin/admin-teachers/admin-teachers.component";
import {AdminStrandsComponent} from "../../components/admin/admin-strands/admin-strands.component";
import {SectionService} from "../../services/section/section.service";

enum Roles {
  ADMIN,
  TEACHER,
  GUEST
}

enum NavLinks {
  DASHBOARD = "Dashboard",
  ANNOUNCEMENTS = "Announcements",
  STUDENTS = "Students",
  TEACHER_STUDENTS = "Your Students",
  TEACHER_SECTION = "Your Section",
  TEACHER_DASHBOARD = "Dashboard",
  SECTIONS = "Sections",
  STRANDS = "Strands",
  TEACHERS = "Teachers",
  SUBJECTS = "Subjects",
  SCHEDULES = "Schedules",
  REPORTS = "Reports",
}

interface SideNavLink {
  icon: string;
  title: string;
  routerLink: string;
  userRoles?: Roles[];
}

@Component({
  selector: 'app-home',
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
    TopNavigationComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    NgClass,
    AdminDashboardComponent,
    MatLine,
    MatListItemIcon,
    StudentsComponent,
    SectionsComponent,
    TeacherDashboardComponent,
    TeacherStudentsComponent,
    TeacherSectionComponent,
    AnnouncementsComponent,
    AdminTeachersComponent,
    AdminStrandsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  protected roleString = sessionStorage.getItem("role") ?? "GUEST";
  protected role: Roles = Roles[this.roleString as keyof typeof Roles];
  protected navigated: string = "Dashboard";
  protected router: Router = inject(Router);
  private sectionService: SectionService = inject(SectionService);

  // Enums
  public Roles = Roles;
  public NavLinks = NavLinks;
  public sectionSelected: number = 0;

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
    {icon: "stacks", title: 'Strands', routerLink: '/dashboard/strands', userRoles: [Roles.ADMIN]},
    {icon: "person", title: 'Teachers', routerLink: '/dashboard/teachers', userRoles: [Roles.ADMIN]},
    {icon: "book", title: 'Subjects', routerLink: '/dashboard/subjects', userRoles: [Roles.ADMIN]},
    {icon: "calendar_today", title: 'Schedules', routerLink: '/dashboard/schedules', userRoles: [Roles.ADMIN]},
    {icon: "report", title: 'Reports', routerLink: '/dashboard/reports', userRoles: [Roles.ADMIN, Roles.TEACHER]},
  ]

  ngOnInit(): void {
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
    this.sectionSelected = sectionSelected;
  }

}
