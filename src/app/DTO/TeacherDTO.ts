import {User} from "./User";

export interface Teacher {
  id: number
  firstName: string
  lastName: string
  sex: string;
  user: User;
}
