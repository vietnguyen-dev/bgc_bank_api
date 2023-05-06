export interface iUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    club_email: string;
    password: string;
    user_role_id: number;
    club_id: number;
    club_email_id: number;
    pw_reset_code: string | null;
    pw_reset_expire: Date | null;
    date_created: Date;
    date_updated: Date | null;
    date_deleted: Date | null;
  }