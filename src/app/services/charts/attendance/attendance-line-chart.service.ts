import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DateRange, Status} from "../../../DTO/DTOList";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttendanceLineChartService {

  private baseUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getAttendanceLineChart(status: Status, dateRange: DateRange): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/attendances/graphic-organizers/line-chart?status=${status}`, dateRange, {observe: 'response', responseType: 'json'});
  }

  getSectionAttendanceLineChart(sectionId: number, status: Status, dateRange: DateRange): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/attendances/graphic-organizers/sections/${sectionId}/line-chart?status=${status}`, dateRange, {observe: 'response', responseType: 'json'});
  }
}
