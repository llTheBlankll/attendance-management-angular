import {Component, EventEmitter, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Student} from "../../../../DTO/StudentDTO";
import {StudentService} from "../../../../services/student/student.service";
import { HttpResponse } from '@angular/common/http';
import {StatusMessageResponse} from "../../../../DTO/StatusMessageResponse";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    MatCardTitleGroup,
    NgOptimizedImage,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './teacher-students-details.component.html',
  styleUrl: './teacher-students-details.component.css'
})
export class TeacherStudentsDetailsComponent implements OnInit, OnChanges {
  // injections
  private studentService: StudentService = inject(StudentService);
  private snackBarService: MatSnackBar = inject(MatSnackBar);

  @Input()
  public studentSelected = 0;

  // Form fields for student details
  public studentFormFields: FormGroup = new FormGroup({
    studentId: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    gradeName: new FormControl("", Validators.required),
    sectionName: new FormControl("", Validators.required),
    strandName: new FormControl(""),
    guardianName: new FormControl(""),
    birthdate: new FormControl("", Validators.required)
  })

  // Student info to display in the form fields.
  private studentInfo: Student | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["studentSelected"]) {
      // Check if studentSelected is 0
      if (this.studentSelected === 0) {
        return;
      }

      this.loadStudentInfo(this.studentSelected);
    }
  }

  loadStudentInfo(studentId: number) {
    // Load student info
    console.log("Loading student info for student id: " + studentId);
    this.studentService.getStudentById(studentId).subscribe((student: HttpResponse<Student | StatusMessageResponse>) => {
      if (student.status === 200) {
        // Check if the response is a student or a status message
        this.studentInfo = student.body as Student;
        // Set the form fields
        this.studentFormFields.controls["studentId"].setValue(this.studentInfo.id);
        this.studentFormFields.controls["firstName"].setValue(this.studentInfo.firstName);
        this.studentFormFields.controls["lastName"].setValue(this.studentInfo.lastName);
        this.studentFormFields.controls["gradeName"].setValue(this.studentInfo.gradeLevel.name);
        this.studentFormFields.controls["strandName"].setValue(this.studentInfo.gradeLevel.strand?.name);
        this.studentFormFields.controls["sectionName"].setValue(this.studentInfo.section.sectionName);
        this.studentFormFields.controls["guardianName"].setValue(this.studentInfo.guardian?.fullName);
        this.studentFormFields.controls["birthdate"].setValue(this.studentInfo.birthdate);

        this.snackBarService.open(`Student ${studentId} was retrieved successfully.`, "Close");
        return;
      }

      // Handle error
      const statusMessageResponse: StatusMessageResponse = student.body as StatusMessageResponse;
      this.snackBarService.open(statusMessageResponse.message, "Close");
    })
  }

  // Add your logic here...
}
