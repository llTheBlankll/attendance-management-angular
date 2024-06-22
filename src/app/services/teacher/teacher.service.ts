import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../../DTO/TeacherDTO";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getTeacherByUserId(userId: number): Observable<HttpResponse<Teacher>> {
    return this.http.get<Teacher>(this.apiUrl + `/api/v1/teachers/user?id=${userId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }
}
