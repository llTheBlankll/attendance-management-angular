import {Status} from "./DTOList";
import {Student} from "./StudentDTO";

export interface WebSocketResponse {
  student: Student;
  date: Date;
  time: string;
  timeOut: string;
  status: Status;
  message: string;
  hashedLrn: string;
}
