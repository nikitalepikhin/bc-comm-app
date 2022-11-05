export interface PostComment {
  uuid: string;
  postUuid: string;
  authorUuid: string;
  role: string;
  body: string;
  parentUuid: string | null;
  authorUsername: string;
  resVote: number;
  created: Date;
  modified: Date;
  level: number;
  up: number | null;
  down: number | null;
  dir: -1 | 0 | 1 | null;
}
