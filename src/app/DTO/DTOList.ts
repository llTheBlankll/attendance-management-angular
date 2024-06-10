export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  INVALID = "INVALID",
  VALID = "VALID"
}

export enum Status {
  LATE = "LATE",
  EXCUSED = "EXCUSED",
  OUT = "OUT",
  EARLY = "EARLY",
  EXISTS = "EXISTS",
  SIGNED_OUT = "SIGNED_OUT",
  ON_TIME = "ON_TIME",
  OTHERS = "OTHERS",
  ALL = "ALL",
  ABSENT = "ABSENT"
}

export class DateRange {
  startDate: Date;
  endDate: Date;

  constructor(startTime: Date, endTime: Date) {
    this.startDate = startTime;
    this.endDate = endTime;
  }
}

export interface LoginToken {
  username: string;
  token: string;
  role: string;
  expiration: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export class StatusMessageResponse {
  message: string;
  status: ResponseStatus;

  constructor(message: string, status: ResponseStatus) {
    this.message = message;
    this.status = status;
  }
}

export interface LineChartDTO {
  labels: string[];
  data: number[];
}
