import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {TeacherStudentsListComponent} from "./teacher-students-list/teacher-students-list.component";
import {TeacherStudentsDetailsComponent} from "./teacher-students-details/teacher-students-details.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-teacher-students',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    TeacherStudentsListComponent,
    TeacherStudentsDetailsComponent,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider
  ],
  templateUrl: './teacher-students.component.html',
  styleUrl: './teacher-students.component.css'
})
export class TeacherStudentsComponent {

  @Input()
  public section = 0;

  onStudentSelected(studentId: number) {
    console.log(`Selected student: ${studentId}`);
  }
}
