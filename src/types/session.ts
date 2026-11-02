// Session types

import type { ObjectId } from "./common";

export type SessionType = "email" | "password";

export interface Session {
  _id: ObjectId;
  password: string;
  sessionType: SessionType;
  userId: ObjectId;
  createdAt: string;
}
