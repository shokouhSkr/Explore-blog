"use client";

import Link from "next/link";
import useSWR from "swr";
import { SingleComment, TextArea } from "..";
import { useSession } from "next-auth/react";
import { commentsFetcher } from "@/helpers/utils";
import { Comment } from "@/types";

type CommentsPropsType = {
  postSlug: string;
  locale: string;
  dictionary: any;
};

const Comments = ({ postSlug, locale, dictionary }: CommentsPropsType) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(`/api/comments?postSlug=${postSlug}`, commentsFetcher);

  // Check if data is available, then destructure comments, or provide an empty array as a default value.
  const { comments = [] } = data || {};
  const typedComments = comments as Comment[];

  return (
    <div className="space-y-4">
      {/* TITLE */}
      <span className="text-xl font-semibold">
        {comments &&
          `${
            comments.length === 0
              ? `${dictionary.comments["no-comment"]}`
              : `${dictionary.comments.comments} (${comments.length})`
          }`}
      </span>

      {/* COMMENT INPUT */}
      {status === "authenticated" && (
        <TextArea dictionary={dictionary} postSlug={postSlug} onMutate={mutate} />
      )}
      {status !== "authenticated" && (
        <div>
          <Link href="/login">{dictionary.comments["no-login"]}</Link>
        </div>
      )}

      {/* COMMENTS LIST */}
      {comments.length > 0 && (
        <div className="space-y-2">
          {isLoading
            ? "Loading comments..."
            : typedComments?.map((comment) => (
                <SingleComment locale={locale} key={comment.id} comment={comment} />
              ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
