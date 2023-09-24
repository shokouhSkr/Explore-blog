"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type TextAreaPropsType = {
  dictionary: any;
  postSlug: string;
  onMutate: () => void;
};

const TextArea = ({ dictionary, postSlug, onMutate }: TextAreaPropsType) => {
  const [comment, setComment] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment) return;

    setIsHandling(true);
    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ description: comment, postSlug }),
      });

      onMutate(); // for revalidation
      setIsHandling(false);
      setComment("");
      toast.success(dictionary.toasts.comment.successMessage);
    } catch (error) {
      toast.error(dictionary.toasts.wrongMessage);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex md:items-center flex-col md:flex-row relative w-full gap-2.5 mt-4"
    >
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder={dictionary.comments.placeholder}
        className="w-full pb-8 p-4 text-base shadow rounded-md outline-none placeholder:text-sm bg-white/80 dark:text-neutral-800"
      />
      <button
        type="submit"
        className="px-3 py-2 rounded-md whitespace-nowrap hover:bg-neutral-950 active:bg-neutral-950 transition-all duration-200 active:scale-[.98] bg-neutral-900 text-neutral-200"
      >
        {!isHandling ? `${dictionary.buttons.send}` : `${dictionary.buttons.sending}`}
      </button>
    </form>
  );
};

export default TextArea;
