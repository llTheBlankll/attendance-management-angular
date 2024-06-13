import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {AttendanceLineChartService} from "../../../services/charts/attendance/attendance-line-chart.service";
import {StudentService} from "../../../services/student/student.service";
import {AttendanceService} from "../../../services/attendance/attendance.service";
import {AttendanceSubscriberWebSocketService} from "../../../services/websockets/attendance-subscriber-web-socket.service";
import {DateRange, LineChartDTO, Status} from "../../../DTO/DTOList";
import {HttpResponse} from "@angular/common/http";
import {Chart} from "chart.js/auto";
import {WebSocketResponse} from "../../../DTO/WebSocketResponse";
import {NgClass, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatChip} from "@angular/material/chips";

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
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatGridList,
    MatGridTile,
    MatIcon,
    NgClass,
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatNoDataRow,
    NgIf,
    MatChip
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  private attendanceChartsService = inject(AttendanceLineChartService);
  private studentService = inject(StudentService);
  private attendanceService: AttendanceService = inject(AttendanceService);

  protected realTimeNotificationWebSocket = inject(AttendanceSubscriberWebSocketService);
  protected attendanceOverviewChart: any;
  protected realTimeAttendanceChart: any;
  protected _getAttendanceOverviewBy: AttendanceDay = AttendanceDay.TODAY;

  // On Time, Late, Absent, and Total Students
  protected onTimeAttendance: number = 0;
  protected lateAttendance: number = 0;
  protected absentAttendance: number = 0;
  protected totalStudents: number = 0;

  // Recent Activities table and Data Source
  protected displayedColumns: string[] = ['name', 'grade', 'section', 'time', 'date', 'status'];
  protected recentActivitiesRow: RecentActivitiesRow[] = [
  ];
  protected recentActivitiesTableDataSource: MatTableDataSource<any> = new MatTableDataSource(this.recentActivitiesRow);


  constructor() {
  }

  set getAttendanceOverviewBy(value: AttendanceDay) {
    this._getAttendanceOverviewBy = value;
    this.onGetAttendanceOverviewByChanged();
  }

  onGetAttendanceOverviewByChanged(): void {
    let startDate = new Date();
    if (this._getAttendanceOverviewBy == AttendanceDay.TODAY) {
      // The End Date + 1 day
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      this.updateAttendanceOverviewCharts(startDate, endDate);
    } else if (this._getAttendanceOverviewBy == AttendanceDay.WEEKLY) {
      startDate.setDate(startDate.getDate() - 7);
      this.updateAttendanceOverviewCharts(startDate, new Date());
    } else if (this._getAttendanceOverviewBy == AttendanceDay.MONTHLY) {
      startDate.setMonth(startDate.getMonth() - 1);
      this.updateAttendanceOverviewCharts(startDate, new Date());
    }
  }

  updateAttendanceOverviewCharts(startDate: Date, endDate: Date): void {
    console.log("Updating Attendance Overview Charts: " + startDate + " - " + endDate)

    // Region: Get Late Attendance from the Server
    this.attendanceChartsService.getAttendanceLineChart(Status.LATE, new DateRange(
      startDate,
      endDate
    )).subscribe((response: HttpResponse<LineChartDTO>) => {
      if (response == undefined) {
        console.error("Error: No data found for Late Attendance");
        return;
      }

      let data: LineChartDTO | null = response.body;
      if (data != null) {
        this.updateAttendanceOverviewData(data.labels, data.data, 0);
      } else {
        console.error("Error: No data found for Late Attendance");
      }
    });
    // End: Get Late Attendance
    // Region: Get On Time Attendance from the server
    this.attendanceChartsService.getAttendanceLineChart(Status.ON_TIME, new DateRange(
      startDate,
      endDate
    )).subscribe((response: HttpResponse<LineChartDTO>) => {
      if (response == undefined) {
        console.error("Error: No data found for On Time Attendance");
        return;
      }

      let data: LineChartDTO | null = response.body;

      if (data != null) {
        this.updateAttendanceOverviewData(data.labels, data.data, 1);
      } else {
        console.error("Error: No data found for On Time Attendance");
      }
    });
    // End: Get On Time Attendance
  }

  /**
   * * Initialize the Dashboard Statistics, the total number of students, on time, late, and absent attendance
   */
  initializeDashboardStatistics() {
    this.studentService.countStudents().subscribe((response: number) => {
      console.log(response);
      this.totalStudents = response;
    });

    let currentDate = new Date();

    this.attendanceService.countAttendance(new DateRange(currentDate, currentDate), Status.ON_TIME).subscribe((response: HttpResponse<number>) => {
      this.onTimeAttendance = response.body as number;
    });

    this.attendanceService.countAttendance(new DateRange(currentDate, currentDate), Status.LATE).subscribe((response: HttpResponse<number>) => {
      this.lateAttendance = response.body as number;
    });

    this.attendanceService.countAttendance(new DateRange(currentDate, currentDate), Status.ABSENT).subscribe((response: HttpResponse<number>) => {
      this.absentAttendance = response.body as number;
    });
  }

  ngOnInit(): void {
    this.initializeDashboardStatistics();

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
        labels: [
        ],
        datasets: [
          {
            label: 'Late',
            data: [
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            tension: 0.4,
          },
          {
            label: 'On Time',
            data: [
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            tension: 0.4,
          },
          {
            label: 'Signed Out',
            data: [
            ],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            tension: 0.4,
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
  }

  realTimeNotificationListener(): void {
    // Connect to the Real Time Notification WebSocket
    this.realTimeNotificationWebSocket.connect().subscribe((event: MessageEvent) => {
      const data: WebSocketResponse = JSON.parse(event.data);
      if (data.status == Status.LATE) {
        this.lateAttendance++;
        this.addRealTimeAttendanceChartData(1, 0);
      } else if (data.status == Status.ON_TIME) {
        this.onTimeAttendance++;
        this.addRealTimeAttendanceChartData(1, 1);
      } else if (data.status == Status.SIGNED_OUT) {
        this.addRealTimeAttendanceChartData(1, 2);
      }

      this.addRecentActivityRow(data);
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

  addRealTimeAttendanceChartData(data: number, dataset: number = 0) {
    let now = new Date();
    now.setSeconds(0, 0);
    let roundedTime = now.toLocaleTimeString("en-gb");
    if (this.realTimeAttendanceChart) {

      // Before pushing the data, let's check if the data already exists and then add +1 to the data
      let index = this.realTimeAttendanceChart.data.labels.indexOf(roundedTime);
      if (index != -1) {
        this.realTimeAttendanceChart.data.datasets[dataset].data[index] += data;
        this.realTimeAttendanceChart.update();
        return;
      } else {
        this.realTimeAttendanceChart.data.labels.push(roundedTime);
        this.realTimeAttendanceChart.data.datasets[dataset].data.push(data);
        console.log(this.realTimeAttendanceChart.data.datasets[dataset].data);
        console.log(this.realTimeAttendanceChart.data.labels);
        this.realTimeAttendanceChart.update();
      }
    }
  }

  updateAttendanceOverviewData(label: string[], data: number[], dataset: number = 0) {
    this.attendanceOverviewChart.data.labels = label;
    this.attendanceOverviewChart.data.datasets[dataset].data = data;
    this.attendanceOverviewChart.update();
  }
}
