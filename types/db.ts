import { Post, User, Interest } from "@prisma/client";

export interface ExtendedPost extends Post {
  user: User;
  interests: Interest[];
  _count: {
    likes: number;
    reposts: number;
    comments: number;
  };
  isLiked?: boolean;
  isReposted?: boolean;
}

export interface ExtendedUser extends User {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
  isFollowing?: boolean;
}

export interface ExtendedInterest extends Interest {
  _count: {
    posts: number;
    users: number;
  };
}
