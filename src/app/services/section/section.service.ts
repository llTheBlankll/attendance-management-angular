import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  getTeacherSections(teacherId: number): Observable<any> {
    return this.http.get(this.apiUrl + `/api/v1/sections/teacher/teacher?id=${teacherId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  getAllSections(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/v1/sections/all?noPaging=true`, { responseType: 'json', observe: 'response'});
  }
}
