import {Component, Input} from '@angular/core';
import {MatGridList} from "@angular/material/grid-list";

@Component({
  selector: 'app-teacher-section',
  standalone: true,
  imports: [
    MatGridList
  ],
  templateUrl: './teacher-section.component.html',
  styleUrl: './teacher-section.component.css'
})
export class TeacherSectionComponent {

  @Input()
  public section = 0;
}
