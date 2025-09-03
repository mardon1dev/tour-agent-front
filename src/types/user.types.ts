export interface User {
  preferences: Preference;
  _id: string;
  name: string;
  phone: string;
  email: string;
  home_location: string;
  created_at: string;
  __v: number;
}

export interface Preference {
  likes: string[];
  budget: string;
}
