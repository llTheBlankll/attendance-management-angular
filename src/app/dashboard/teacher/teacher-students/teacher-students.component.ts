import {Component, Input, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {TeacherStudentsListComponent} from "./teacher-students-list/teacher-students-list.component";
import {TeacherStudentsDetailsComponent} from "./teacher-students-details/teacher-students-details.component";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {Chart} from "chart.js/auto";
import {Top10StudentsListComponent} from "./top-10-students-list/top-10-students-list.component";

@Component({
  selector: 'app-teacher-students',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    TeacherStudentsListComponent,
    TeacherStudentsDetailsComponent,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatIcon,
    MatCardTitleGroup,
    Top10StudentsListComponent
  ],
  templateUrl: './teacher-students.component.html',
  styleUrl: './teacher-students.component.css'
})
export class TeacherStudentsComponent implements OnInit {

  constructor() {
  }

  @Input()
  public section = 0;

  public studentSelected = 0;

  // Pie Chart with Chart JS
  public pieChartLabels = ["Male", "Female"];
  public pieChartData = [512, 235];
  public pieChart: Chart<"pie", number[], string> | undefined;

  ngOnInit() {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [
          {
            data: this.pieChartData,
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ],
      },
      options: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1000
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    });
  }

  onStudentSelected(studentId: number) {
    console.log(`Selected student: ${studentId}`);
    this.studentSelected = studentId;
  }
}
