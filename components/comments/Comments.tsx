"use client";

import Link from "next/link";
import useSWR from "swr";
import { SingleComment, TextArea } from "..";
import { useSession } from "next-auth/react";
import { commentsFetcher } from "@/helpers/utils";
import { Comment } from "@/types";

const Comments = ({ postSlug }: { postSlug: string }) => {
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
              ? "Currently, there are no comments. Will you be the first?"
              : `Comments (${comments.length})`
          }`}
      </span>

      {/* COMMENT AREA */}
      {status === "authenticated" && <TextArea postSlug={postSlug} onMutate={mutate} />}
      {status !== "authenticated" && (
        <div>
          <Link href="/login">Login to write your comment.</Link>
        </div>
      )}

      {/* COMMENTS LIST */}
      {comments.length > 0 && (
        <div className="space-y-4">
          {isLoading
            ? "Loading comments..."
            : typedComments?.map((comment) => <SingleComment key={comment.id} comment={comment} />)}
        </div>
      )}
    </div>
  );
};

export default Comments;
