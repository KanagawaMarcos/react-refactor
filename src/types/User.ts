export interface User {
  id: number;
  username: string;
  avatarUrl?: string;
  email: string;
  followers: Follower[];
}

export interface Follower {
  id: number;
  followerSince: string;
}
