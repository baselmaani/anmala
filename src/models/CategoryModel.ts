import { Category } from '@prisma/client';

export class CategoryModel implements Category {
  organizationId: number | null;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
