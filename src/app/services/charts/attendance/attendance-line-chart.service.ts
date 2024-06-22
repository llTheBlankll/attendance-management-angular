import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {DateRange, LineChartDTO, Status} from "../../../DTO/DTOList";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttendanceLineChartService {

  private baseUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getAttendanceLineChart(status: Status, dateRange: DateRange): Observable<HttpResponse<LineChartDTO>> {
    return this.http.post<LineChartDTO>(`${this.baseUrl}/api/v1/attendances/graphic-organizers/line-chart?status=${status}`, dateRange, {observe: 'response', responseType: 'json'});
  }

  getSectionAttendanceLineChart(sectionId: number, status: Status, dateRange: DateRange): Observable<HttpResponse<LineChartDTO>> {
    return this.http.post<LineChartDTO>(`${this.baseUrl}/api/v1/attendances/graphic-organizers/sections/${sectionId}/line-chart?status=${status}`, dateRange, {observe: 'response', responseType: 'json'});
  }
}
