import { Report } from '@prisma/client';

export class ReportModel implements Report {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  longitude: number;
  latitude: number;
  img: string;
}
