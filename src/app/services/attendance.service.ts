import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DateRange, Status} from "../DTO/DTOList";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  apiUrl: string = environment.apiUrl;
  http: HttpClient = inject(HttpClient);

  constructor() { }

  countAttendance(dateRange: DateRange, status: Status): Observable<any> {
    return this.http.post(this.apiUrl + `/api/v1/attendances/status/${status}/date-range`, dateRange, {observe: 'response', responseType: 'json'});
  }


}
