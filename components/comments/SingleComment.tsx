import Image from "next/image";
import { Comment } from "@/types";
import { getRelativeDate } from "@/helpers/utils";

const SingleComment = ({ comment }: { comment: Comment }) => {
  return (
    <div key={comment.id} className="w-full py-6 space-y-4 text-base rounded-md outline-none">
      {/* AVATAR */}
      <div className="flex gap-6 text-sm items-center">
        {comment.user.image && (
          <Image
            src={comment.user.image}
            alt={comment.user.name}
            width={50}
            height={50}
            className="object-cover object-center rounded-full w-[50px] h-[50px]"
          />
        )}
        <div className="flex flex-col gap-1 font-medium">
          <span>{comment.user.name}</span>
          <span>{getRelativeDate(comment.createdAt)}</span>
        </div>
      </div>

      {/* MESSAGE */}
      <p className="text-neutral-600 dark:text-neutral-400">{comment.description}</p>
    </div>
  );
};

export default SingleComment;
