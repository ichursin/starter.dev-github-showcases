// todo: cleanup
export interface GithubSearchIssueLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
}

export type GithubSearchIssueUser = {
  login: string;
  avatar_url: string;
};

export type GithubSearchIssueAssignee = GithubSearchIssueUser;
export type GithubSearchIssueState = 'open' | 'close';

export enum GithubIssueAuthorAssociation {
  Collaborator = 'COLLABORATOR',
  Contributor = 'CONTRIBUTOR',
  FirstTimeContributor = 'FIRST_TIME_CONTRIBUTOR',
  FirstTimer = 'FIRST_TIMER',
  Mannequin = 'MANNEQUIN',
  Member = 'MEMBER',
  None = 'NONE',
  Owner = 'OWNER',
}

export interface GithubSearchIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GithubSearchIssueUser;
  labels: GithubSearchIssueLabel[];
  state: GithubSearchIssueState;
  locked: boolean;
  assignee: GithubSearchIssueUser | null;
  assignees: GithubSearchIssueAssignee[];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: GithubIssueAuthorAssociation;
  active_lock_reason: string | null;
  draft: boolean;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string | null;
  };
  body: string;

  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  statuses_url: string;
}

export interface GithubSearchIssueApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubSearchIssue[];
}