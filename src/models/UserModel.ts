import { User } from '@prisma/client';

export class UserModel implements User {
  roleId: number;
  organizationId: number | null;
  id: number;
  name: string;
  email: string;
  tel: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserInput {
  name: string;
  email: string;
  password: string;
  tel: string;
}

export class GenerateTokenInput {
  id: number;
  name: string;
  email: string;
  tel: string;
}

export class TokenResultType {
  token: string;
}
