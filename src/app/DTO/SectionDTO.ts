import {Teacher} from "./TeacherDTO";
import {Strand} from "./StrandDTO";
import {GradeLevel} from "./GradeLevelDTO";

export interface Section {
  id: number;
  teacher: Teacher;
  room: string;
  strand: Strand;
  gradeLevel: GradeLevel
  sectionName: string
}
