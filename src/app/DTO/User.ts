import {Roles} from "../enums/Roles";

export interface User {
  id: number;
  username: string;
  email: string;
  role: Roles;
  lastLogin: Date;
  createdAt: Date;
}
