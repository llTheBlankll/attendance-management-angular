import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-teacher-students',
  standalone: true,
  imports: [],
  templateUrl: './teacher-students.component.html',
  styleUrl: './teacher-students.component.css'
})
export class TeacherStudentsComponent {

  @Input()
  public section: number = 0;
}
