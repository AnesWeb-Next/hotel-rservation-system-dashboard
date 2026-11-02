// Rating types

import type { ObjectId } from "./common";
import type { User } from "./user";
import type { Room } from "./room";

export interface Rating {
  _id: ObjectId;
  ratedBy: ObjectId | User;
  roomId: ObjectId | Room;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
