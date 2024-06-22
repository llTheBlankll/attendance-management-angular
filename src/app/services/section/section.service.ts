import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../../DTO/SectionDTO";
import {SortDirection} from "../../enums/SortDirection";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl: string = environment.apiUrl + "/api/v1/sections";
  private http: HttpClient = inject(HttpClient);

  public createSection(section: Section) {
    return this.http.post(this.apiUrl + "/create", section, {responseType: 'json', observe: 'response'});
  }

  public updateSection(sectionId: number, section: Section) {
    return this.http.put(this.apiUrl + `/${sectionId}`, section, {responseType: 'json', observe: 'response'});
  }

  public updateSectionTeacher(sectionId: number, teacherId: number) {
    return this.http.patch(this.apiUrl + `/${sectionId}/teacher`, {
      params: {
        sectionId: sectionId,
        teacherId: teacherId
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public updateSectionGradeLevel(sectionId: number, gradeLevelId: number) {
    return this.http.patch(this.apiUrl + `/${sectionId}/grade-level`, {
      params: {
        gradeLevelId: gradeLevelId
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public updateSectionName(sectionId: number, name: string) {
    return this.http.patch(this.apiUrl + `/${sectionId}/name`, null, {
      params: {
        name: name
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public deleteSection(sectionId: number) {
    return this.http.delete(this.apiUrl + `/${sectionId}`, {
        responseType: 'json',
        observe: 'response'
      }
    );
  }

  public getAllSectionsNoPaging() {
    return this.http.get<Section[]>(this.apiUrl + "/all", {
      params: {
        noPaging: true
      },
      responseType: 'json',
      observe: 'response'
    });
  }

  public getAllSections(page: number, size: number, orderBy: SortDirection = SortDirection.ASC, sortBy = "sectionName"): Observable<any> {
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

  public getSectionById(sectionId: number): Observable<any> {
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
