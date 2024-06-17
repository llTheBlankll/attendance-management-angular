import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GradeLevel} from "../../DTO/GradeLevelDTO";

@Injectable({
  providedIn: 'root'
})
export class GradeLevelService {

  private apiUrl = environment.apiUrl + "/api/v1/grade-levels";
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  public getAllGradeLevelsNoPaging() {
    return this.http.get<GradeLevel[]>(`${this.apiUrl}/all`, {
      params: {
        noPaging: true
      }
    });
  }

  public getAllGradeLevels(page: number, size: number, sortBy: string, order: string) {
    return this.http.get(`${this.apiUrl}/all`, {
      params: {
        page: page,
        size: size,
        sortBy: sortBy,
        order: order
      }
    });
  }

  public createGradeLevel(gradeLevel: GradeLevel) {
    return this.http.post
  }

  public deleteGradeLevel(gradeLevelId: number) {
    return this.http.delete(`${this.apiUrl}/${gradeLevelId}`);
  }

  public getGradeLevelById(gradeLevelId: number) {
    return this.http.get(`${this.apiUrl}/${gradeLevelId}`);
  }

  public updateGradeLevel(gradeLevel: GradeLevel) {
    return this.http.put(`${this.apiUrl}/${gradeLevel.id}`, gradeLevel);
  }

  public countAllGradeLevels() {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/count`);
  }

  public searchGradeLevels(name: string, page: number, size: number, sortBy: string, order: string) {
    return this.http.get(`${this.apiUrl}/search?name=${name}`);
  }
}
