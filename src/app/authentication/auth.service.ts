import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable, of} from "rxjs";
import {LoginDTO, ResponseMessage, StatusMessageResponse, ResponseStatus} from "../DTOList";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl: string = environment.authenticationUrl;
  private readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  isAuthenticated(): boolean {
    let token: string | null = sessionStorage.getItem("token");
    let username: string | null = sessionStorage.getItem("username");

    if (token && username) {
      this.http.post<HttpResponse<StatusMessageResponse>>(this.baseUrl + `/api/auth/is-valid?token=${token}&username=${username}`, {responseType: 'json', observe: 'response'})
        .pipe(
          map((response: HttpResponse<StatusMessageResponse>) => {
            let message = response.body;

            if (message?.status == ResponseStatus.VALID) {
              return of(true);
            }

            return of(false);
          })
        ).subscribe();

      return true;
    }

    return false;
  }

  login(login: LoginDTO): Observable<any> {
    console.log("Requesting login to " + this.loginUrl);
    return this.http.post<LoginDTO | ResponseMessage>(this.loginUrl, login, {responseType: 'json', observe: 'response'});
  }
}
