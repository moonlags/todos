import { Inbox } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const SignIn = () => {
  return (
    <Button
      className="mt-60 flex flex-row items-center justify-center gap-4 px-8 py-8"
      onClick={() => void signIn()}
    >
      <Inbox />
      <p className="text-xl font-semibold text-gray-200">Sign In</p>
    </Button>
  );
};

export default SignIn;
