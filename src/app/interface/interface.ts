import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtInterface extends JwtPayload {
  userId: string;
  role: 'admin' | 'student' | 'faculty';
}
