import useUser from "@/hooks/useUser";


const getSession = async (ctx) => {
  const { req, res } = ctx;
  const isAuth = req.cookies?.isAuth;

  if (Boolean(!isAuth) || !isAuth) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  return {
    props: {},
  };
};

export default getSession;
