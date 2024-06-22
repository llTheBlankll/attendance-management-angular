import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {StudentService} from "../../../../services/student/student.service";
import {Student, StudentPaging} from "../../../../DTO/StudentDTO";
import { HttpResponse } from '@angular/common/http';

interface TableStudent {
  lrn: number;
  name: string;
  sexuality: string;
  grade: string;
}

@Component({
  selector: 'app-teacher-students-list',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    MatPaginator,
    MatAnchor,
    MatButton,
    MatNoDataRow
  ],
  templateUrl: './teacher-students-list.component.html',
  styleUrl: './teacher-students-list.component.css'
})
export class TeacherStudentsListComponent implements OnInit, OnChanges {

  // injections
  studentService: StudentService = inject(StudentService);

  @Input()
  public section = 0;

  @Output()
  public readonly selectedStudent: EventEmitter<number> = new EventEmitter<number>();

  // Students list
  students: TableStudent[] = [];
  studentsTableDataSource: MatTableDataSource<TableStudent> = new MatTableDataSource<TableStudent>(this.students);

  // Columns
  displayedColumns: string[] = ['lrn', 'name', 'sexuality', 'grade', 'actions'];

  // Paginator
  studentListPaginator = {
    totalElements: this.students.length,
    pageSize: 10,
    currentPage: 0,
    pageSizeOptions: [5, 10, 25, 100]
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["section"]) {
      this.loadStudents(this.section);
    }
  }

  loadStudents(sectionId: number): void {
    console.log(`Loading students from section: ${this.section} with page: ${this.studentListPaginator.currentPage} and size: ${this.studentListPaginator.pageSize}`);
    this.studentService.getStudentsBySection(
      sectionId,
      this.studentListPaginator.currentPage,
      this.studentListPaginator.pageSize,

    ).subscribe((response: HttpResponse<StudentPaging>) => {
      if (response.status === 200 && response.body != null) {
        this.students = response.body.content.map((student: Student) => {
          return {
            lrn: student.id,
            name: student.firstName + " " + student.middleInitial + " " + student.lastName,
            sexuality: student.sex,
            grade: student.gradeLevel.name
          }
        });
        this.studentsTableDataSource = new MatTableDataSource<TableStudent>(this.students);
        this.studentListPaginator.totalElements = response.body.totalElements;
      }
    });
  }

  onPaginationChange(page: PageEvent): void {
    this.studentListPaginator.currentPage = page.pageIndex;
    this.studentListPaginator.pageSize = page.pageSize;
    this.studentListPaginator.totalElements = page.length;
    this.loadStudents(this.section);
  }

  onEdit(studentId: number): void {
    console.log("Editing student: " + studentId);
  }

  onDelete(studentId: number): void {
    console.log("Deleting student: " + studentId);
  }

  selectStudents(studentId: number): void {
    this.selectedStudent.emit(studentId);
  }
}
