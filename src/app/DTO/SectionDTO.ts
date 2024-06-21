import {Teacher} from "./TeacherDTO";
import {Strand} from "./StrandDTO";
import {GradeLevel} from "./GradeLevelDTO";
import {Student} from "./StudentDTO";

export interface Section {
  id: number;
  teacher: Teacher;
  room: string;
  strand: Strand;
  gradeLevel: GradeLevel
  sectionName: string
}

export interface SectionStudents {
  id: number;
  teacher: Teacher;
  room: string;
  strand: Strand;
  gradeLevel: GradeLevel;
  sectionName: string;
  students: Student[];
}
