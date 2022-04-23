import { User } from '@prisma/client';

export class UserModel implements User {
  roleId: number;
  organizationId: number | null;
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
