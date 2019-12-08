export const initialState = {
  message: "holla mundo",
  loading: false,
  user: {
    status: {
      name: "",
      email: "",
      isVerified: false,
      uid: ""
    }
  },
  cookies: [
    {
      cookieId: "",
      cookieName: "",
      expirationDate: null,
      domainName: "",
      group: {
        id: "",
        name: ""
      },
      provider: ""
    }
  ]
};
