import {Component, inject, Input} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDrawer} from "@angular/material/sidenav";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router} from "@angular/router";


@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent {
  @Input()
  public sidenav: MatDrawer | any;
  private router: Router = inject(Router);


  logOut(): void {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("expiration");
    this.router.navigate(['/login']).then(_ => console.log("Log out"));
  }
}
