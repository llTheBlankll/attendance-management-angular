import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav} from "@angular/material/sidenav";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {TopNavigationComponent} from "../components/top-navigation/top-navigation.component";

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
    TopNavigationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router: Router = inject(Router);

  protected sidenavLinks: Array<SideNavLink> = [
    {icon: 'home', title: 'Home', routerLink: '/dashboard/home'},
    {icon: 'account_circle', title: 'Profile', routerLink: '/dashboard/profile'},
    {icon: 'settings', title: 'Settings', routerLink: '/dashboard/settings'},
    {icon: 'leave', title: 'Logout', routerLink: '/dashboard'}
  ]

  constructor() {}

  logOut(): void {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("expiration");
    this.router.navigate(['/login']).then(_ => console.log("Log out"));
  }
}
