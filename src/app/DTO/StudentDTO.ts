import {GradeLevel} from "./GradeLevelDTO";
import {Guardian} from "./GuardianDTO";
import {Section} from "./SectionDTO";

export interface Student {
  id: number;
  firstName: string;
  middleInitial: string;
  lastName: string;
  prefix: string;
  gradeLevel: GradeLevel;
  guardian: Guardian;
  sex: string;
  section: Section;
  address: string;
  birthdate: Date;
}

export interface StudentPaging {
  content: Student[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
