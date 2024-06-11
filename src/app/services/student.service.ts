import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl: string = environment.apiUrl;
  http: HttpClient = inject(HttpClient);

  constructor() {
  }

  /**
   * Get all student list
   *
   * @param page Page
   * @param size The number of items to display
   */
  getStudentList(page: number, size: number) {
    return this.http.get(this.apiUrl + `/api/v1/students?page=${page}&size=${size}`);
  }

  /**
   * Get student by id
   *
   * @param id
   */
  getStudentById(id: number) {
    return this.http.get(this.apiUrl + `/api/v1/students/${id}`);
  }

  countStudents(): Observable<number> {
    return new Observable<number>(subscriber => {

      this.http.get<number>(this.apiUrl + `/api/v1/students/statistics/all`)
        .subscribe(response => {
          let responseType: string = typeof (response);
          if (responseType == "number") {
            console.log("Total Students: " + response);
            subscriber.next(response as number);
          } else {
            console.error("Error: No data found for Total Students");
          }

          subscriber.next(response as number);
        });
    })
  }
}
