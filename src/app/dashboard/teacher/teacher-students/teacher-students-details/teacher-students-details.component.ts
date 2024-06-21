import { Component } from '@angular/core';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle, MatCardTitleGroup
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-teacher-students-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatIcon,
    MatCardAvatar,
    MatCardTitleGroup
  ],
  templateUrl: './teacher-students-details.component.html',
  styleUrl: './teacher-students-details.component.css'
})
export class TeacherStudentsDetailsComponent {

  constructor() { }

  public studentSelected: number = 0;

  // Add your logic here...
}
