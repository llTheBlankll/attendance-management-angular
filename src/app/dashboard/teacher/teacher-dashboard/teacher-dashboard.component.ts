import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatChip} from "@angular/material/chips";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {AttendanceLineChartService} from "../../../services/charts/attendance/attendance-line-chart.service";
import {StudentService} from "../../../services/student/student.service";
import {AttendanceService} from "../../../services/attendance/attendance.service";
import {
  AttendanceSubscriberWebSocketService
} from "../../../services/websockets/attendance-subscriber-web-socket.service";
import {DateRange, LineChartDTO, Status} from "../../../DTO/DTOList";
import {HttpResponse} from "@angular/common/http";
import {Chart} from "chart.js/auto";
import {WebSocketResponse} from "../../../DTO/WebSocketResponse";
import {NgClass} from "@angular/common";
import {CountDTO} from "../../../DTO/CountDTO";

enum AttendanceDay {
  TODAY,
  WEEKLY,
  MONTHLY,
}

interface RecentActivitiesRow {
  name: string;
  grade: string;
  section: string;
  time: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCell,
    MatCellDef,
    MatChip,
    MatColumnDef,
    MatGridList,
    MatGridTile,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatTable,
    NgClass,
    MatHeaderCellDef,
    MatCardTitle
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit, OnChanges {

  // * Services
  private attendanceChartsService = inject(AttendanceLineChartService);
  private studentService = inject(StudentService);
  private attendanceService: AttendanceService = inject(AttendanceService);

  protected realTimeNotificationWebSocket = inject(AttendanceSubscriberWebSocketService);
  protected attendanceOverviewChart: any;
  protected realTimeAttendanceChart: any;
  protected _getAttendanceOverviewBy: AttendanceDay = AttendanceDay.TODAY;

  // On Time, Late, Absent, and Total Students
  protected onTimeAttendance = 0;
  protected lateAttendance = 0;
  protected absentAttendance = 0;
  protected totalStudents = 0;

  // Recent Activities table and Data Source
  protected displayedColumns: string[] = ['name', 'grade', 'section', 'time', 'date', 'status'];
  protected recentActivitiesRow: RecentActivitiesRow[] = [];
  protected recentActivitiesTableDataSource: MatTableDataSource<any> = new MatTableDataSource(this.recentActivitiesRow);

  // Section
  @Input()
  public section = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["section"]) {
      this.updateDashboardStatistics();
      this.onGetAttendanceOverviewByChanged();
    }
  }

  set getAttendanceOverviewBy(value: AttendanceDay) {
    this._getAttendanceOverviewBy = value;
    this.onGetAttendanceOverviewByChanged();
  }

  onGetAttendanceOverviewByChanged(): void {
    const startDate = new Date();
    if (this._getAttendanceOverviewBy === AttendanceDay.TODAY) {
      // The End Date + 1 day
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      this.updateAttendanceOverviewCharts(startDate, endDate);
    } else if (this._getAttendanceOverviewBy === AttendanceDay.WEEKLY) {
      startDate.setDate(startDate.getDate() - 7);
      this.updateAttendanceOverviewCharts(startDate, new Date());
    } else if (this._getAttendanceOverviewBy === AttendanceDay.MONTHLY) {
      startDate.setMonth(startDate.getMonth() - 1);
      this.updateAttendanceOverviewCharts(startDate, new Date());
    }
  }

  updateAttendanceOverviewCharts(startDate: Date, endDate: Date): void {
    // Region: Get Late Attendance from the Server
    this.attendanceChartsService.getSectionAttendanceLineChart(this.section, Status.LATE, new DateRange(
      startDate,
      endDate
    )).subscribe((response: HttpResponse<LineChartDTO>) => {
      if (response === undefined) {
        console.error("Error: No data found for Late Attendance");
        return;
      }

      const data: LineChartDTO | null = response.body;
      if (data != null) {
        this.updateAttendanceOverviewData(data.labels, data.data, 0);
      } else {
        console.error("Error: No data found for Late Attendance");
      }
    });
    // End: Get Late Attendance
    // Region: Get On Time Attendance from the server
    this.attendanceChartsService.getSectionAttendanceLineChart(this.section, Status.ON_TIME, new DateRange(
      startDate,
      endDate
    )).subscribe((response: HttpResponse<LineChartDTO>) => {
      if (response === undefined) {
        console.error("Error: No data found for On Time Attendance");
        return;
      }

      const data: LineChartDTO | null = response.body;

      if (data != null) {
        this.updateAttendanceOverviewData(data.labels, data.data, 1);
      } else {
        console.error("Error: No data found for On Time Attendance");
      }
    });
    // End: Get On Time Attendance
    // Region: Get Absents Attendance from the server
    this.attendanceChartsService.getSectionAttendanceLineChart(this.section, Status.ABSENT, new DateRange(
      startDate,
      endDate
    )).subscribe((response: HttpResponse<LineChartDTO>) => {
      if (response === undefined) {
        console.error("Error: No data found for Absent Attendance");
        return;
      }

      const data: LineChartDTO | null = response.body;

      if (data != null) {
        this.updateAttendanceOverviewData(data.labels, data.data, 2);
      } else {
        console.error("Error: No data found for Absent Attendance");
      }
    });
    // End of: Get Absent Attendance
  }

  /**
   * * Initialize the Dashboard Statistics, the total number of students, on time, late, and absent attendance
   */
  initializeDashboardStatistics() {
    this.studentService.countStudents().subscribe((response: number) => {
      this.totalStudents = response;
    });

    this.updateDashboardStatistics();
  }

  ngOnInit(): void {

    // Region: Initialize the Attendance Overview Chart
    this.attendanceOverviewChart = new Chart('attendanceOverviewChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Late',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.9)',
            borderColor: 'rgba(255, 99, 132, 0.9)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.7)',
            hoverBorderColor: 'rgba(255, 99, 132, 0.7)'
          },
          {
            label: 'On Time',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
            hoverBorderColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Signed Out',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 1)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 206, 86, 0.7)',
            hoverBorderColor: 'rgba(255, 206, 86, 0.7)'
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              precision: 0
            }
          },
          x: {
            type: "time",
            time: {
              unit: "day"
            }
          }
        },
        responsive: true,
        aspectRatio: 38 / 14,
        maintainAspectRatio: true
      }
    });
    // End of: Initialize the Attendance Overview Chart

    this.realTimeAttendanceChart = new Chart('realTimeAttendanceChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Late',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'On Time',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Signed Out',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              precision: 0
            }
          },
          x: {
            type: "time",
            time: {
              unit: "minute",
              round: "minute",
              parser: "HH:mm"
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 75
            }
          }
        },
        responsive: true,
        aspectRatio: 38 / 14,
        maintainAspectRatio: true
      }
    });

    // Initialize the Attendance Overview By Time Chart
    this.getAttendanceOverviewBy = AttendanceDay.TODAY;

    // Initialize the Real Time Notification Listener
    this.realTimeNotificationListener();
    this.initializeDashboardStatistics();
  }

  realTimeNotificationListener(): void {
    // Connect to the Real Time Notification WebSocket
    this.realTimeNotificationWebSocket.connect().subscribe((event: MessageEvent) => {
      const data: WebSocketResponse = JSON.parse(event.data);
      if (data.student.section.id === this.section) {
        if (data.status === Status.LATE) {
          this.lateAttendance++;
          this.addRealTimeAttendanceChartData(1, 0);
        } else if (data.status === Status.ON_TIME) {
          this.onTimeAttendance++;
          this.addRealTimeAttendanceChartData(1, 1);
        } else if (data.status === Status.SIGNED_OUT) {
          this.addRealTimeAttendanceChartData(1, 2);
        }

        this.addRecentActivityRow(data);
      } else {
        this.addRecentActivityRow(data);
      }
    });
  }

  addRecentActivityRow(data: WebSocketResponse) {
    // Add the data in the recent activities, the most recent activity will be at the top
    this.recentActivitiesRow.push({
      name: data.student.lastName + ", " + data.student.firstName + " " + data.student.middleInitial + ".",
      grade: data.student.gradeLevel.name,
      section: data.student.section.sectionName,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      status: data.status.replace("_", " ")
    });

    // Remove the outdated data from the recent activities
    if (this.recentActivitiesRow.length > 10) {
      this.recentActivitiesRow.shift();
    }

    this.recentActivitiesTableDataSource.data = this.recentActivitiesRow;
  }

  addRealTimeAttendanceChartData(data: number, dataset = 0) {
    const now = new Date();
    now.setSeconds(0, 0);
    const roundedTime = now.toLocaleTimeString("en-gb");
    if (this.realTimeAttendanceChart) {
      // Before pushing the data, let's check if the data already exists and then add +1 to the data
      const index = this.realTimeAttendanceChart.data.labels.indexOf(roundedTime);
      if (index !== -1) {
        this.realTimeAttendanceChart.data.datasets[dataset].data[index] += data;
        this.realTimeAttendanceChart.update();
        return;
      } else {
        this.realTimeAttendanceChart.data.labels.push(roundedTime);
        this.realTimeAttendanceChart.data.datasets[dataset].data.push(data);
        this.realTimeAttendanceChart.update();
      }
    } else {
      console.error("Error: Real Time Attendance Chart is not initialized");
    }
  }

  updateAttendanceOverviewData(label: string[], data: number[], dataset = 0) {
    this.attendanceOverviewChart.data.labels = label;
    this.attendanceOverviewChart.data.datasets[dataset].data = data;
    this.attendanceOverviewChart.update();
  }

  updateDashboardStatistics() {
    // Convert date to yyyy-mm-dd
    const currentDate = new Date();

    // Count the total number of students in a section
    this.studentService.countStudentsBySection(this.section).subscribe((response: HttpResponse<CountDTO>) => {
      if (response.body === undefined) {
        console.error("Error: No data found for Total Students");
        return;
      }

      this.totalStudents = response.body.count as number ?? 1000;
    });
    this.attendanceService.countAttendanceInSectionByDate(this.section, currentDate, Status.ON_TIME).subscribe((response: HttpResponse<CountDTO>) => {
      if (response.body === undefined) {
        console.error("Error: No data found for On Time Attendance");
        return;
      }
      this.onTimeAttendance = response.body.count as number ?? 1000;
    });
    this.attendanceService.countAttendanceInSectionByDate(this.section, currentDate, Status.LATE).subscribe((response: HttpResponse<CountDTO>) => {
      if (response.body === undefined) {
        console.error("Error: No data found for Late Attendance");
        return;
      }
      this.lateAttendance = response.body.count ?? 1000;
    });
    this.attendanceService.countAttendanceInSectionByDate(this.section, currentDate, Status.ABSENT).subscribe((response: HttpResponse<CountDTO>) => {
      if (response.body === undefined) {
        console.error("Error: No data found for Absent Attendance");
        return;
      }
      this.absentAttendance = response.body.count as number ?? 1000;
    });
  }
}
