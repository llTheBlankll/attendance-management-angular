export interface StatusMessageResponse {
  message: string;
  status: ExecutionStatus;
}

enum ExecutionStatus {
  SUCCESS,
  FAILURE,
  NOT_FOUND,
  VALIDATION_ERROR,
  INVALID,
  VALID
}
