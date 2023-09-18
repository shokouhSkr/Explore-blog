export type SiteInfo = {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
};

export type Category = {
  id: string;
  title: string;
  slug?: string;
  image?: string;
  description?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
};

export type Comment = {
  id: string;
  createdAt: string;
  description: string;
  userEmail: string;
  user: User;
  postSlug: string;
  post: Post;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  category: Category;
  catSlug: string;
  userEmail: string;
  comments: Comment[];
  slug: string;
  image: string;
  body: string;
  createdAt: string;
  user: User;
};
