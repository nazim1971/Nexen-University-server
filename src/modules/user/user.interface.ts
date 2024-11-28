export type Tuser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
};
