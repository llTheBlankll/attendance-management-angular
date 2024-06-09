export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  INVALID = "INVALID",
  VALID = "VALID"
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

export interface ResponseMessage {
  message: string;
}

export interface StatusMessageResponse {
  message: string;
  status: ResponseStatus;
}
