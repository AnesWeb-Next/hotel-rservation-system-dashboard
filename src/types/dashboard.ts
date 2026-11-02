// Dashboard types — matches GET /admin/dashboard response

export interface DashboardStats {
  users: {
    total: number;
    admins: number;
    active: number;
    newThisMonth: number;
  };
  rooms: {
    total: number;
    active: number;
  };
  bookigs: {
    total: number;
    pending: number;
    active: number;
    overdue: number;
    returned: number;
  };
  ratings: {
    total: number;
    average: number;
  };
}
