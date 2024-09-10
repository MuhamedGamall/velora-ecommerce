export interface ProjectInterface {}

export interface UserProfile {
  _type: string;
  name: string;
  _id: string;
  _updatedAt: Date;
  email: string;
  image: string;
  _createdAt: Date;
  _rev: string;
}

export interface CurrentServerSession {
  user: UserProfile;
  expires: Date;
}
