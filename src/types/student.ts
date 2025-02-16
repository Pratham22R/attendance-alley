
export interface Student {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string | null;
  student_id: string;
  branch_id: string;
  updated_at: string;
  branches?: {
    name: string;
  };
}

export interface Branch {
  id: string;
  name: string;
}
