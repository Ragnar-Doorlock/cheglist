export type NewUserData = {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserData = NewUserData & {
  id: string;
};