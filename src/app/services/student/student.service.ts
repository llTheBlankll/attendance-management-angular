import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountDTO} from "../../DTO/CountDTO";
import {Student, StudentPaging} from "../../DTO/StudentDTO";
import {SortDirection} from "../../enums/SortDirection";
import {StatusMessageResponse} from "../../DTO/StatusMessageResponse";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl: string = environment.apiUrl;
  http: HttpClient = inject(HttpClient);

  countStudents(): Observable<number> {
    return new Observable<number>(subscriber => {

      this.http.get<number>(this.apiUrl + "/api/v1/students/statistics/all")
        .subscribe(response => {
          const responseType: string = typeof (response);
          if (responseType === "number") {
            console.log("Total Students: " + response);
            subscriber.next(response as number);
          } else {
            console.error("Error: No data found for Total Students");
          }

          subscriber.next(response as number);
        });
    })
  }

  countStudentsBySection(sectionId: number) {
    return this.http.get<CountDTO>(this.apiUrl + `/api/v1/students/statistics/section?section=${sectionId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public getAllStudents(page: number, size: number): Observable<any> {
    return this.http.get(this.apiUrl + `/api/v1/students/all?page=${page}&size=${size}`);
  }

  public createStudent(student: Student): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.post<StatusMessageResponse>(this.apiUrl + "/api/v1/students/create", student,
      {
        observe: 'response',
        responseType: 'json'
      });
  }

  public deleteStudent(studentId: number): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.delete<StatusMessageResponse>(this.apiUrl + `/api/v1/students/${studentId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public updateStudent(studentId: number, student: Student): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.put<StatusMessageResponse>(this.apiUrl + `/api/v1/students/${studentId}`, student, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public updateStudentGradeLeveL(studentId: number, gradeLevelId: number): Observable<StatusMessageResponse> {
    return this.http.patch<StatusMessageResponse>(this.apiUrl + `/api/v1/students/${studentId}/${gradeLevelId}/grade-level?gradeLevelId=${gradeLevelId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public updateStudentSection(studentId: number, sectionId: number): Observable<StatusMessageResponse> {
    return this.http.patch<StatusMessageResponse>(this.apiUrl + `/api/v1/students/${studentId}/${sectionId}/section?sectionId=${sectionId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public getStudentById(studentId: number): Observable<HttpResponse<Student | StatusMessageResponse>> {
    return this.http.get<Student | StatusMessageResponse>(this.apiUrl + `/api/v1/students/${studentId}`, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public getStudentByGuardianId(guardianId: number): Observable<HttpResponse<Student | StatusMessageResponse>> {
    return this.http.get<Student | StatusMessageResponse>(this.apiUrl + "/api/v1/students/by-guardian", {
      observe: 'response',
      responseType: 'json',
      params: {
        guardianId: guardianId
      }
    });
  }

  public searchStudents(firstName: string, lastName: string, page: number, size: number, sortBy = "lastName", orderBy: SortDirection = SortDirection.ASC): Observable<HttpResponse<StudentPaging>> {
    return this.http.get<StudentPaging>(this.apiUrl + "/api/v1/students/search", {
      observe: 'response',
      responseType: 'json',
      params: {
        firstName: firstName,
        lastName: lastName,
        page: page,
        size: size,
        sortBy: sortBy,
        orderBy: orderBy
      }
    });
  }

  public getStudentsBySection(sectionId: number, page: number, size: number, sortBy = "lastName", orderBy: SortDirection = SortDirection.ASC): Observable<HttpResponse<StudentPaging>> {
    return this.http.get<StudentPaging>(this.apiUrl + `/api/v1/students/all/section/${sectionId}`, {
      observe: 'response',
      responseType: 'json',
      params: {
        page: page,
        size: size,
        sortBy: sortBy,
        orderBy: orderBy
      }
    });
  }

  public getStudentsByGradeLevel(gradeLevelId: number, page: number, size: number, sortBy = "lastName", orderBy: SortDirection = SortDirection.ASC): Observable<HttpResponse<StudentPaging>> {
    return this.http.get<StudentPaging>(this.apiUrl + `/api/v1/students/all/grade-level/${gradeLevelId}`, {
      observe: 'response',
      responseType: 'json',
      params: {
        page: page,
        size: size,
        sortBy: sortBy,
        orderBy: orderBy
      }
    });
  }

  public isStudent(obj: any): obj is Student {
    return 'id' in obj && 'name' in obj; // replace 'id' and 'name' with actual properties of Student
  }
}
