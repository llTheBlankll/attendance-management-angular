import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getTeacherByUserId(userId: number): Observable<any> {
    return this.http.get(this.apiUrl + `/api/v1/teachers/user?id=${userId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }
}
