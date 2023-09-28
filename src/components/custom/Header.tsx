import { useSession } from "next-auth/react";
import LoggedInHeader from "./LoggedInHeader";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-row items-center bg-gray-100 px-10 py-3 shadow-sm">
      <p className="text-4xl font-bold text-gray-700">Todos</p>
      {sessionData && <LoggedInHeader />}
    </div>
  );
};

export default Header;
