import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AttendanceService} from "../../../../services/attendance/attendance.service";

@Component({
  selector: 'app-top-10-students-list',
  standalone: true,
  imports: [],
  templateUrl: './top-10-students-list.component.html',
  styleUrl: './top-10-students-list.component.css'
})
export class Top10StudentsListComponent implements OnChanges, OnInit {

  private attendanceService: AttendanceService = inject(AttendanceService);

  @Input()
  public section: number = 0;

  ngOnInit(): void {
    // ! throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["section"]) {
      console.log('Section changed: ', this.section);
    }
    // ! throw new Error('Method not implemented.');
  }
}
