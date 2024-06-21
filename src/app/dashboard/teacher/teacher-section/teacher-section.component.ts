import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-teacher-section',
  standalone: true,
  imports: [],
  templateUrl: './teacher-section.component.html',
  styleUrl: './teacher-section.component.css'
})
export class TeacherSectionComponent {

  @Input()
  public section = 0;
}
