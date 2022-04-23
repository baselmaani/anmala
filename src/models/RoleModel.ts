import { Role } from '@prisma/client';

export class RoleModel implements Role {
  description: string | null;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
