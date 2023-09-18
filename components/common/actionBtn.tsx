import { ReactNode } from "react";

const ActionBtn = ({ icon, id }: { icon: ReactNode; id: string }) => {
  return (
    <>
      <input type="file" id={id} onChange={(e) => e.target?.files?.[0]} className="hidden" />
      <label htmlFor={id}>
        <div className="bg-green-50 cursor-pointer transition-colors duration-200 rounded-full w-10 h-10 active:bg-green-800/40 hover:bg-green-100 flex-center py-2">
          {icon}
        </div>
      </label>
    </>
  );
};

export default ActionBtn;
