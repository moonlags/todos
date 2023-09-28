import { useSession } from "next-auth/react";
import Image from "next/image";
import SignOut from "./SingOut";

const LoggedInHeader = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) return <></>;

  return (
    <div className="flex w-full flex-row items-center justify-end">
      {sessionData.user.image && (
        <Image
          src={sessionData.user.image}
          className="rounded-full border border-gray-600"
          width={48}
          height={48}
          alt="profile picture"
        />
      )}
      <p className="ml-4 font-semibold text-gray-700">
        {sessionData.user.name}
      </p>
      <div className="ml-20 flex">
        <SignOut />
      </div>
    </div>
  );
};

export default LoggedInHeader;
