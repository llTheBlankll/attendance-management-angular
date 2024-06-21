import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DateRange, Status} from "../../DTO/DTOList";
import {Observable} from "rxjs";
import {CountDTO} from "../../DTO/CountDTO";
import {SortDirection} from "../../enums/SortDirection";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  apiUrl: string = environment.apiUrl + "/api/v1/attendances";
  http: HttpClient = inject(HttpClient);

  constructor() {
  }

  countAttendance(dateRange: DateRange, status: Status): Observable<any> {
    return this.http.post(this.apiUrl + `/status/${status}/date-range`, dateRange, {
      observe: 'response',
      responseType: 'json'
    });
  }

  countAttendanceInSectionByDateRange(sectionId: number, dateRange: DateRange, status: Status): Observable<any> {
    return this.http.post(this.apiUrl + `/status/${status}/section/${sectionId}/date-range`, dateRange, {
      observe: 'response',
      responseType: 'json'
    });
  }

  countAttendanceInSectionByDate(sectionId: number, date: Date, status: Status): Observable<any> {
    const formattedDate: string = date.toISOString().split('T')[0];
    return this.http.get<CountDTO>(this.apiUrl + `/status/${status}/section/${sectionId}/date?date=${formattedDate}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  getAllSectionAndGradeLevelAttendanceByDate(sectionId: number, gradeLevelId: number, date: Date, page: number, size: number, sortBy = "date", orderBy: SortDirection = SortDirection.ASC): Observable<any> {
    const formattedDate = date.toISOString().split('T')[0];

    return this.http.get(this.apiUrl + `/statistics/section/${sectionId}/grade-level/${gradeLevelId}/date`, {
      params: {
        date: formattedDate,
        page: page,
        size: size,
        noPaging: false,
        sortBy: sortBy,
        orderBy: orderBy
      },
      observe: 'response',
      responseType: 'json'
    });
  }
}
