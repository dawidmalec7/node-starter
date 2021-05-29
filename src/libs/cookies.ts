const createAccessTokenCookie = (token: string) => {
  const name = "jwt";
  const value = token;
  const options = {
    secure: true,
    httpOnly: true,
  };

  return { name, value, options };
};

export { createAccessTokenCookie };
