"use client";

import { FormEvent, useState } from "react";

const PostForm = ({ dictionary }: { dictionary: any }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // notif: you have to fill all inputs
    if (!formData.name || !formData.email || !formData.message) return;

    setIsHandling(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    // notif: send successfully
    setFormData({ name: "", email: "", message: "" });
    setIsHandling(false);
  };

  return (
    <form className="flex relative flex-col space-y-5">
      {/* NAME */}
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder={dictionary.contact.form.name}
        className="p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-sm sm:placeholder:text-base placeholder:italic "
      />

      {/* EMAIL */}
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder={dictionary.contact.form.email}
        className="p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-sm sm:placeholder:text-base placeholder:italic "
      />

      {/* BODY */}
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder={dictionary.contact.form.message}
        cols={30}
        rows={10}
        className="resize-none p-4 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder:text-sm placeholder:italic sm:placeholder:text-base"
      ></textarea>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={submitHandler}
          className="bg-green-700 text-neutral-100 w-full md:inline-block py-2 rounded-md hover:bg-green-800 active:bg-green-800 active:scale-[.98] duration-200 md:w-28"
        >
          {!isHandling ? `${dictionary.buttons.send}` : `${dictionary.buttons.sending}`}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
