export interface TTodoFilter {
  status: string | null;
  assignee: string | null;
  reporter: string | null;
  labels: string | null;
  sprint: string | null;
  priority: string | null;
}

export interface TFilterOption {
  label: string;
  value: string | null;
}
