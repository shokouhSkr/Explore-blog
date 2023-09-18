"use client";

import { useState } from "react";
import { Image as ImageIcon, Link2, Minus, Plus, Video } from "lucide-react";
import { ActionBtn } from "..";

const PostForm = () => {
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="flex relative flex-col space-y-5">
      {/* TITLE */}
      <input
        type="text"
        placeholder="Title"
        className="p-4 shadow text-xl font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400"
      />

      {/* DESCRIPTION */}
      <input
        type="text"
        placeholder="Description"
        className="p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400"
      />

      {/* BODY */}
      <textarea
        placeholder="Tell your story..."
        cols={30}
        rows={15}
        className="resize-none p-4 pt-20 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400"
      ></textarea>

      {/* PUBLISH BUTTON */}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-green-700 text-neutral-100 w-full md:inline-block py-2 rounded-md hover:bg-green-800 active:bg-green-800 duration-200 md:w-24"
        >
          Publish
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="absolute top-[9.5rem] left-4 flex gap-6">
        {/* PLUS BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-200 transition-colors duration-200 rounded-full w-10 h-10 active:bg-neutral-300 hover:bg-neutral-300 flex-center py-2"
        >
          {isOpen ? <Minus size={16} color="#444" /> : <Plus size={16} color="#444" />}
        </button>

        <div className={`${isOpen ? "flex" : "hidden"} items-center gap-2`}>
          <ActionBtn icon={<ImageIcon size={16} color="#166534" />} id="image" />
          <ActionBtn icon={<Video size={16} color="#166534" />} id="video" />
          <ActionBtn icon={<Link2 size={16} color="#166534" />} id="link" />
        </div>
      </div>
    </form>
  );
};

export default PostForm;
