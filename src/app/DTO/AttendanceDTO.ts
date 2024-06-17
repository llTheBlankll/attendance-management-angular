import {Student} from "./StudentDTO";
import {Status} from "./DTOList";

export interface Attendance {
  id: number;
  student: Student;
  status: Status;
  date: string;
  time: string;
  timeOut: string;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface AttendancePaging {
  content: Attendance[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
