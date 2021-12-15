import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function login({ providers }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2  px-40 text-center bg-black">
        <img
          src="https://links.papareact.com/9xl"
          alt=""
          className="w-52 mb-5"
        />
        <p className="text-xs">
          This is not a REAL app, it is built for educational purposes only
        </p>
        <div className="mt-10">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-6 bg-[#18D860] rounded-full text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
