import { notFound } from "next/navigation";
import { Comments, Container, PostBody, PostHero, SocialLink } from "@/components";
import { getDictionary, getSinglePost, unslugify } from "@/helpers/utils";
import { Post } from "@/types";
import prisma from "@/helpers/connect";

// DYNAMIC METADATA
export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  return {
    title: unslugify(params.slug),
  };
};

export const generateStaticParams = async () => {
  const posts = await prisma.post.findMany({
    select: { slug: true },
  });

  const params = posts?.map((post) => {
    return { slug: post.slug as string, lang: "en" };
  });

  const localizedParams = posts?.map((post) => {
    return { slug: post.slug as string, lang: "fa" };
  });

  const allParams = params?.concat(localizedParams ?? []);

  return allParams || [];
};

export default async function SinglePostPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const { slug, lang } = params;
  const { post } = await getSinglePost(slug);
  const dictionary = await getDictionary(lang);

  // You can use a not-found.tsx file for writing a custom not found page.
  if (!post) notFound();

  let translatedPost = post;
  if (lang === "fa")
    translatedPost = {
      ...post,
      title: post.translation[0].title,
      description: post.translation[0].description,
      body: post.translation[0].body,
      catSlug: post.translation[0].catSlug,
    };

  return (
    <Container locale={lang}>
      <div className="space-y-10">
        <PostHero locale={lang} post={translatedPost} />

        <div className="flex flex-col md:flex-row gap-10">
          {/* SOCIAL SHARE */}
          <div className="relative">
            <div className="sticky top-20 items-center flex md:flex-col gap-5">
              <div className="font-medium md:hidden">{dictionary.share.text}</div>
              <SocialLink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>

          {/* POST BODY */}
          <div className="w-full mb-5 md:mb-10">
            <PostBody body={translatedPost.body} />
          </div>
        </div>

        {/* COMMENTS */}
        <Comments locale={lang} postSlug={slug} dictionary={dictionary} />
      </div>
    </Container>
  );
}
