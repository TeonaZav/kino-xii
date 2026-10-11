export interface ProfileVenue {
  id: number;
  slug: string;
  name: string;
  city: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number;
  preferredVenue: ProfileVenue | null;
  profileComplete: boolean;
}

export interface UpdateProfilePayload {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  preferredVenueId?: number | null;
  avatar?: File | null;
}

export interface ProfileValidationErrors {
  [field: string]: string | string[] | undefined;
}
