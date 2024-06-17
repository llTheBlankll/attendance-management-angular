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
