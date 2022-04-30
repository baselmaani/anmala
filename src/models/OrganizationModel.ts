import { Organization } from '@prisma/client';

export class OrganizationModel implements Organization {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  lng: number;
  lat: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo: string;
}
