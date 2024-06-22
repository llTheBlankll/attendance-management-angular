import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../../DTO/SectionDTO";
import {SortDirection} from "../../enums/SortDirection";
import {StatusMessageResponse} from "../../DTO/StatusMessageResponse";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl: string = environment.apiUrl + "/api/v1/sections";
  private http: HttpClient = inject(HttpClient);

  public createSection(section: Section): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.post<StatusMessageResponse>(this.apiUrl + "/create", section, {responseType: 'json', observe: 'response'});
  }

  public updateSection(sectionId: number, section: Section): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.put<StatusMessageResponse>(this.apiUrl + `/${sectionId}`, section, {responseType: 'json', observe: 'response'});
  }
  public updateSectionGradeLevel(sectionId: number, gradeLevelId: number): Observable<StatusMessageResponse> {
    return this.http.patch<StatusMessageResponse>(this.apiUrl + `/${sectionId}/grade-level`, {
      params: {
        gradeLevelId: gradeLevelId
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public updateSectionName(sectionId: number, name: string): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.patch<StatusMessageResponse>(this.apiUrl + `/${sectionId}/name`, null, {
      params: {
        name: name
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public deleteSection(sectionId: number): Observable<HttpResponse<StatusMessageResponse>> {
    return this.http.delete<StatusMessageResponse>(this.apiUrl + `/${sectionId}`, {
        responseType: 'json',
        observe: 'response'
      }
    );
  }

  public getAllSectionsNoPaging(): Observable<HttpResponse<Section[]>> {
    return this.http.get<Section[]>(this.apiUrl + "/all", {
      params: {
        noPaging: true
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public getAllSections(page: number, size: number, orderBy: SortDirection = SortDirection.ASC, sortBy = "sectionName") {
    return this.http.get(this.apiUrl + "/all", {
      params: {
        page: page,
        size: size,
        orderBy: orderBy,
        sortBy: sortBy
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public getSectionById(sectionId: number) {
    return this.http.get(this.apiUrl + `/${sectionId}`, {responseType: 'json', observe: 'response'});
  }

  public getSectionsByTeacher(teacherId: number, page: number, size: number, orderBy: SortDirection = SortDirection.ASC, sortBy = "sectionName") {
    return this.http.get(this.apiUrl + "/teacher", {
      params: {
        teacherId: teacherId,
        page: page,
        size: size,
        orderBy: orderBy,
        sortBy: sortBy
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public getSectionsByGradeLevel(gradeLevelId: number, page: number, size: number, orderBy: SortDirection = SortDirection.ASC, sortBy = "sectionName") {
    return this.http.get(this.apiUrl + "/grade-level", {
      params: {
        gradeLevelId: gradeLevelId,
        page: page,
        size: size,
        orderBy: orderBy,
        sortBy: sortBy
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public searchSections(room: string, name: string, page: number, size: number, orderBy: SortDirection = SortDirection.ASC, sortBy = "sectionName") {
    return this.http.get(this.apiUrl + "/search", {
      params: {
        room: room,
        name: name,
        page: page,
        size: size,
        orderBy: orderBy,
        sortBy: sortBy
      },
      responseType: 'json',
      observe: 'response'
    });
  }
}
