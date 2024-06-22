import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDrawer} from "@angular/material/sidenav";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {Roles} from "../../enums/Roles";
import {Section} from "../../DTO/SectionDTO";
import {SectionService} from "../../services/section/section.service";
import {HttpResponse} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    NgOptimizedImage
  ],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.css'
})
export class TopHeaderComponent implements OnInit {
  @Input()
  public sidenav: MatDrawer | any;

  @Output()
  public readonly sectionSelected: EventEmitter<number> = new EventEmitter<number>();

  private router: Router = inject(Router);
  protected sections: Section[] = [];
  private sectionService: SectionService = inject(SectionService);

  logOut(): void {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("expiration");
    this.router.navigate(['/login']).then(_ => console.log("Log out"));
  }

  ngOnInit(): void {
    // Check role
    const userRole = Roles[sessionStorage.getItem("role") as keyof typeof Roles];
    if (userRole === Roles.TEACHER) {
      console.log("Teacher role detected");
      // Get All Sections
      this.sectionService.getAllSectionsNoPaging().subscribe((response: HttpResponse<Section[]>) => {
        if (response.status === 200 && response.body != null) {
          this.sections = response.body;
        } else {
          console.log("Error getting sections");
        }
      })
    } else if (userRole === Roles.ADMIN) {
      console.log("Admin");
    } else {
      console.log("Unknown role detected");
    }
  }
}
