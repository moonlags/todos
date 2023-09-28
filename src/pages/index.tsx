import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "~/components/custom/Header";
import SignIn from "~/components/custom/SignIn";
import TodosView from "~/components/custom/TodosView";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="description" content="Todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mt-20 flex w-screen justify-center">
        <div>{sessionData ? <TodosView /> : <SignIn />}</div>
      </div>
    </>
  );
}
