import readingTime from "reading-time";
import { DateTime } from "luxon";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from "lucide-react";

export const getReadingTime = (text: string) => {
  return readingTime(text).text;
};

export const getRelativeDate = (date: string) => {
  return DateTime.fromISO(date).toRelative();
};

export const getIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook size="18" />;
    case "twitter":
      return <Twitter size="18" />;
    case "instagram":
      return <Instagram size="18" />;
    case "youtube":
      return <Youtube size="18" />;
    case "linkedin":
      return <Linkedin size="18" />;
    case "github":
      return <Github size="18" />;
  }
};

export const commentsFetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("error fetching comments!");
  }

  const data = res.json();

  return data;
};

/////////////////////////////////////////////////
// PRISMA

export const getCategories = async () => {
  const res = await fetch("http:localhost:3000/api/categories", { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("getting categories failed!");
  }

  return res.json();
};

export const getAllPosts = async () => {
  const res = await fetch(`http:localhost:3000/api/posts`, { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("getting posts failed!");
  }

  return res.json();
};

export const getPaginatedPosts = async (page: number, category: string) => {
  const res = await fetch(`http:localhost:3000/api/posts-pagination/${category}?page=${page}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("getting posts failed!");
  }

  return res.json();
};

export const getSinglePost = async (slug: string) => {
  const res = await fetch(`http:localhost:3000/api/posts/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("getting single post failed!");
  }

  return res.json();
};
