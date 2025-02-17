import { Blob, User, Interest, Comment } from "@prisma/client";

export type ExtendedComment = Comment & {
  user: User;
};

export type ExtendedBlob = Blob & {
  user: User;
  interests: Interest[];
  comments: ExtendedComment[];
  _count: {
    likes: number;
    comments: number;
  };
};

// export type ExtendedUser = User & {
//   _count: {
//     followers: number;
//     following: number;
//   };
//   isFollowing?: boolean;
// };

export type ExtendedInterest = Interest & {
  _count: {
    blobs: number;
  };
};
