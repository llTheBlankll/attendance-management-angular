import {Component, inject, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav} from "@angular/material/sidenav";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {TopNavigationComponent} from "../../components/top-navigation/top-navigation.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Chart} from "chart.js/auto";
import {AttendanceLineChartService} from "../../components/charts/attendance/attendance-line-chart.service";
import {DateRange, LineChartDTO, Status} from "../../DTO/DTOList";
import {HttpResponse} from "@angular/common/http";
import {
  AttendanceSubscriberWebSocketService
} from "../../components/websockets/attendance-subscriber-web-socket.service";
import {MatButton} from "@angular/material/button";
import {StudentService} from "../../components/services/student.service";
import {AttendanceService} from "../../components/services/attendance.service";
import {WebSocketResponse} from "../../DTO/WebSocketResponse";
import 'chartjs-adapter-moment';

enum AttendanceDay {
  TODAY,
  WEEKLY,
  MONTHLY,
}

interface SideNavLink {
  icon: string;
  title: string;
  routerLink: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridList,
    MatDrawerContainer,
    MatDrawer,
    MatSidenav,
    MatNavList,
    RouterLinkActive,
    MatListItem,
    RouterLink,
    MatDrawerContent,
    MatIcon,
    MatGridTile,
    MatList,
    NgOptimizedImage,
    MatDivider,
    TopNavigationComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public sidenavLinks: Array<SideNavLink> = [
    {icon: 'home', title: 'Home', routerLink: '/dashboard/home'},
    {icon: 'account_circle', title: 'Profile', routerLink: '/dashboard/profile'},
    {icon: 'settings', title: 'Settings', routerLink: '/dashboard/settings'},
    {icon: 'leave', title: 'Logout', routerLink: '/dashboard'}
  ]
  private router: Router = inject(Router);
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

  constructor() {
  }

  get getAttendanceOverviewBy(): AttendanceDay {
    return this._getAttendanceOverviewBy;
  }

  set getAttendanceOverviewBy(value: AttendanceDay) {
    this._getAttendanceOverviewBy = value;
    this.onGetAttendanceOverviewByChanged();
  }

  onGetAttendanceOverviewByChanged(): void {
    if (this._getAttendanceOverviewBy == AttendanceDay.TODAY) {
      this.initializeAttendanceCharts(new Date(), new Date());
    } else if (this._getAttendanceOverviewBy == AttendanceDay.WEEKLY) {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      this.initializeAttendanceCharts(startDate, new Date());
    } else if (this._getAttendanceOverviewBy == AttendanceDay.MONTHLY) {
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      this.initializeAttendanceCharts(startDate, new Date());
    }
  }

  initializeAttendanceCharts(startDate: Date, endDate: Date): void {
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

    this.attendanceService.countAttendance(new DateRange(new Date(), new Date()), Status.ON_TIME).subscribe((response: HttpResponse<number>) => {
      console.log(response);
      this.onTimeAttendance = response.body as number;
    });

    this.attendanceService.countAttendance(new DateRange(new Date(), new Date()), Status.LATE).subscribe((response: HttpResponse<number>) => {
      console.log(response);
      this.lateAttendance = response.body as number;
    });

    this.attendanceService.countAttendance(new DateRange(new Date(), new Date()), Status.ABSENT).subscribe((response: HttpResponse<number>) => {
      console.log(response);
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
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'On Time',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
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
            data: [
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            stack: "Stack 1"
          },
          {
            label: 'On Time',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
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
      }
    });

    // Initialize the Attendance Overview By Time Chart
    this.initializeAttendanceCharts(new Date(), new Date());

    this.realTimeNotificationListener();
  }

  realTimeNotificationListener(): void {
    // Connect to the Real Time Notification WebSocket
    this.realTimeNotificationWebSocket.connect().subscribe((event: MessageEvent) => {
      const data: WebSocketResponse = JSON.parse(event.data);
      if (data.status == Status.LATE) {
        this.addRealTimeAttendanceChartData(1, 0);
      } else if (data.status == Status.ON_TIME) {
        this.addRealTimeAttendanceChartData(1, 1);
      } else if (data.status == Status.SIGNED_OUT) {
        this.addRealTimeAttendanceChartData(1, 2);
      }
    });
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

  logOut(): void {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("expiration");
    this.router.navigate(['/login']).then(_ => console.log("Log out"));
  }
}
