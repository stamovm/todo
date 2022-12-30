import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Note: React.FC = () => {
  return (
    <div className="m-2 rounded-md border border-teal-500 p-2">
      <div className="">
        <textarea name="text">example note</textarea>
      </div>
    </div>
  );
};

const Notes: NextPage = () => {
  const { data: session } = useSession();
  if (!session) return <h2>Please sign in</h2>;
  return (
    <div className="rounded-md border border-teal-500 p-2">
      <p className="ml-2 text-xl">Create a new note </p>
      <Note />
      <Note />
    </div>
  );
};

export default Notes;
