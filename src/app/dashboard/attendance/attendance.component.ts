import {Component, inject, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatLine, MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {SectionService} from "../../services/section/section.service";
import {GradeLevelService} from "../../services/grade-level/grade-level.service";
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
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpResponse} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AttendanceService} from "../../services/attendance/attendance.service";
import {GradeLevel} from "../../DTO/GradeLevelDTO";
import {Section} from "../../DTO/SectionDTO";
import {AttendancePaging} from "../../DTO/AttendanceDTO";
import {SortDirection} from "../../enums/SortDirection";
import {Router, RouterLink} from "@angular/router";

interface AttendanceRow {
  lrn: number;
  studentName: string;
  status: string;
  time: string;
  timeOut: string;
}

interface FormContent {
  section: number;
  gradeLevel: number;
  date: Date;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatLine,
    MatCardTitleGroup,
    MatCardActions,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    MatHint,
    MatFormFieldModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    MatIconButton,
    MatNoDataRow,
    MatPaginator,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {

  protected sectionService: SectionService = inject(SectionService);
  protected gradeLevelService: GradeLevelService = inject(GradeLevelService);
  protected attendanceService: AttendanceService = inject(AttendanceService);
  protected router: Router = inject(Router);

  // Attendance Table
  protected displayedColumns: string[] = ['lrn', 'studentName', 'status', 'time', 'timeOut', 'actions'];
  protected attendanceRows: AttendanceRow[] = [
  ];
  protected attendanceTableDataSource: MatTableDataSource<AttendanceRow> = new MatTableDataSource(this.attendanceRows);

  // Material Selections
  protected sections: Section[] = [];
  protected gradeLevels: GradeLevel[] = [];

  // Material Mat Form Fields
  protected filterForm: FormGroup = new FormGroup({
    section: new FormControl(0, Validators.required),
    gradeLevel: new FormControl(0, Validators.required),
    date: new FormControl(new Date(), Validators.required)
  });

  // Pagination info
  protected attendancePagination = {
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10
  }

  constructor() {
  }

  public attendancePageEvent(event: PageEvent) {
    this.attendancePagination.totalElements = event.length;
    this.attendancePagination.totalPages = event.length / event.pageSize;
    this.attendancePagination.currentPage = event.pageIndex;
    this.attendancePagination.pageSize = event.pageSize;
    console.log(this.attendancePagination);
    this.getAttendances(this.filterForm.value.section, this.filterForm.value.gradeLevel, this.filterForm.value.date);
  }

  updateSectionsSelection() {
    this.sectionService.getAllSectionsNoPaging().subscribe((response: HttpResponse<Section[]>) => {
      if (response.status !== 200 && response.body != null) {
        console.error("Failed to get all sections.");
        return;
      }

      this.sections = response.body ?? [];
    });
  }

  updateGradeLevelsSelection(): void {
    this.gradeLevelService.getAllGradeLevelsNoPaging().subscribe((response: GradeLevel[]) => {
      if (response == null) {
        console.error("Failed to get all grade levels.");
        return;
      }

      this.gradeLevels = response ?? [];
    })
  }

  getAttendances(sectionId: number, gradeLevelId: number, date: Date): void {
    // Get all attendances based on the section, grade level, and date.
    this.attendanceService.getAllSectionAndGradeLevelAttendanceByDate(sectionId, gradeLevelId, date,this.attendancePagination.currentPage, this.attendancePagination.pageSize, "status", SortDirection.DESC).subscribe((response: HttpResponse<AttendancePaging>) => {
      if (response.status !== 200 && response.body == null) {
        console.error("Failed to get all attendances: ", response.body);
        return;
      }

      const attendancePaging: AttendancePaging | null = response.body;

      this.attendancePagination.pageSize = attendancePaging?.size ?? 0;
      this.attendancePagination.currentPage = attendancePaging?.number ?? 0;
      this.attendancePagination.totalElements = attendancePaging?.totalElements ?? 0;
      this.attendancePagination.totalPages = attendancePaging?.totalPages ?? 0;

      // Update attendance row
      this.attendanceRows = attendancePaging?.content.map((attendance) => {
        return {
          lrn: attendance.student.id,
          studentName: attendance.student.firstName + " " + attendance.student.lastName,
          status: attendance.status.replace("_", " "),
          time: attendance.time,
          timeOut: attendance.timeOut
        };
      }) ?? [];
      // Update the data source
      this.attendanceTableDataSource.data = this.attendanceRows;
    });
  }

  ngOnInit(): void {
    // Get all sections and grade levels.
    this.updateSectionsSelection();
    this.updateGradeLevelsSelection();

    // Subscribe to the filter form changes.
    this.filterForm.valueChanges.subscribe((value: FormContent) => {
      if (this.filterForm.valid) {
        this.getAttendances(value.section, value.gradeLevel, value.date);
      }
    });
  }

}
