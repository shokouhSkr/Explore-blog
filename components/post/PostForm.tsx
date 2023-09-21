"use client";

import { useState } from "react";

const PostForm = ({ dictionary }: { dictionary: any }) => {
  const [isHandling, setIsHandling] = useState(false);

  return (
    <form className="flex relative flex-col space-y-5">
      {/* NAME */}
      <input
        type="text"
        placeholder={dictionary.contact.form.name}
        className="p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-sm sm:placeholder:text-base placeholder:italic "
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder={dictionary.contact.form.email}
        className="p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-sm sm:placeholder:text-base placeholder:italic "
      />

      {/* BODY */}
      <textarea
        placeholder={dictionary.contact.form.message}
        cols={30}
        rows={10}
        className="resize-none p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-sm placeholder:italic sm:placeholder:text-base"
      ></textarea>

      {/* PUBLISH BUTTON */}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-green-700 text-neutral-100 w-full md:inline-block py-2 rounded-md hover:bg-green-800 active:bg-green-800 duration-200 md:w-28"
        >
          {!isHandling ? `${dictionary.buttons.send}` : `${dictionary.buttons.sending}`}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
