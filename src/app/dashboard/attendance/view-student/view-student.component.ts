import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../../services/student/student.service";
import {TopHeaderComponent} from "../../../components/top-header/top-header.component";
import {SideNavigationComponent} from "../../../components/side-navigation/side-navigation.component";

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [
    TopHeaderComponent,
    SideNavigationComponent
  ],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit{

  // Injections
  private route: ActivatedRoute = inject(ActivatedRoute);
  private studentService: StudentService = inject(StudentService);

  // Get Student ID from URL
  studentId: number = this.route.snapshot.params["studentId"];


  ngOnInit(): void {
    if (this.studentId === undefined || this.studentId === null) {
      console.error("Student ID is not defined");
    }

    console.log("Student ID FOUND: " + this.studentId);
  }
}
