import Navbar from "@/components/Navbar";
import StatsUser from "@/components/HomePages/StatsUser";
import Play from "@/components/HomePages/Play";
import Arena from "@/components/HomePages/Arena";
import getSession from "@/middleware/getSession";

export default function Example() {
  return (
    <>
      <Navbar />
      <main className="max-w-full px-2 sm:px-4 lg:px-8 mx-auto h-screen">
        <div className="mt-8">
          <div className="lg:grid lg:grid-cols-8 lg:gap-8 flex flex-col space-y-8 lg:space-y-0">
            <StatsUser />
            <Play />
            <Arena />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return session;
}
