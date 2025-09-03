import type { Place } from "./place.types";

export interface Stay {
  _id: string;
  user_id: string;
  place_id: Place;
  check_in: string;
  check_out: string;
  __v: number;
}
