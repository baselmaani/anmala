export class SendEmailInput {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments: any[];
}
