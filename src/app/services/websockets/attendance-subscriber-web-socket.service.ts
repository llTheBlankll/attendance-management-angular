import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttendanceSubscriberWebSocketService {
  private socket: WebSocket = new WebSocket(environment.attendanceSubscriberUrl);
  private subject: Subject<MessageEvent> = new Subject<MessageEvent>();

  public connect(): Subject<MessageEvent> {
    this.socket.onmessage = (event) => {
      console.log(event.data);
      this.subject.next(event);
    }

    this.socket.onopen = (event) => {
      console.log('Connected to server: ', event);
    }

    return this.subject;
  }
}
