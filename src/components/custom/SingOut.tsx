import { DoorOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const SignOut = () => {
  return (
    <Button
      className="flex flex-row items-center justify-center gap-4 px-4 py-5"
      onClick={() => void signOut()}
    >
      <DoorOpen />
      <p className="text-lg text-gray-200">Sign Out</p>
    </Button>
  );
};

export default SignOut;
