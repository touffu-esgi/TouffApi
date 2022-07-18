import { AdminProps } from './admin.props';
export class AdminResponse implements AdminProps {
  email: string;
  id: string;
  password: string;

  constructor(adminProps: AdminProps) {
    this.email = adminProps.email;
    this.id = adminProps.id;
    this.password = adminProps.password;
  }
}
