import {ExecutionStatus} from "../enums/ExecutionStatus";

export interface StatusMessageResponse {
  message: string;
  status: ExecutionStatus;
}
