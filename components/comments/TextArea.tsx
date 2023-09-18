"use client";

import { useState } from "react";

const TextArea = ({ postSlug, onMutate }: { postSlug: string; onMutate: () => void }) => {
  const [comment, setComment] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async () => {
    if (!comment) return;
    setIsHandling(true);

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ description: comment, postSlug }),
    });

    onMutate(); // for revalidation
    setIsHandling(false);
    setComment("");
  };

  return (
    <div className="flex md:items-center flex-col md:flex-row relative w-full gap-2.5 mt-4">
      <textarea
        name="comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder="Write your comment here..."
        className="w-full p-4 resize-none text-base shadow rounded-md outline-none  placeholder:text-sm bg-white/80 dark:text-neutral-800"
      />
      <button
        type="button"
        onClick={submitHandler}
        className="px-3 py-2 rounded-md whitespace-nowrap hover:bg-neutral-950 active:bg-neutral-400/90 transition-all duration-200 bg-neutral-900 text-neutral-200"
      >
        {!isHandling ? "Send" : "Sending..."}
      </button>
    </div>
  );
};

export default TextArea;
