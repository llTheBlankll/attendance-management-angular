import {Status} from "./DTOList";

export interface WebSocketResponse {
  student: Student;
  date: Date;
  time: string;
  timeOut: string;
  status: Status;
  message: string;
  hashedLrn: string;
}

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

export interface GradeLevel {
  id: number;
  name: string;
  strand: Strand;
}

export interface Strand {
  id: number;
  name: string;
}

export interface Guardian {
  id: number;
  fullName: string;
  contactNumber: string;
}

export interface Section {
  id: number;
  teacher: Teacher;
  room: string;
  strand: Strand
  gradeLevel: GradeLevel
  sectionName: string
}

export interface Teacher {
  id: number
  firstName: string
  lastName: string
  sex: string
}
