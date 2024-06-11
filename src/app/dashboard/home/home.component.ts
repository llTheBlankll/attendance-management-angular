import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav} from "@angular/material/sidenav";
import {MatList, MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {TopNavigationComponent} from "../../components/top-navigation/top-navigation.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import 'chartjs-adapter-moment';
import {DashboardComponent} from "../../components/dashboard/dashboard.component";
import {MatLine} from "@angular/material/core";

enum AttendanceDay {
  TODAY,
  WEEKLY,
  MONTHLY,
}

interface SideNavLink {
  icon: string;
  title: string;
  routerLink: string;
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
    DashboardComponent,
    MatLine,
    MatListItemIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public sidenavLinks: Array<SideNavLink> = [
    {icon: 'home', title: 'Home', routerLink: '/dashboard/home'},
    {icon: "person", title: 'Students', routerLink: '/dashboard/students'},
    {icon: "school", title: 'Sections', routerLink: '/dashboard/sections'},
  ]

  ngOnInit(): void {

  }

}
