export const initialState = {
  message: "holla mundo",
  loading: false,
  user: {
    status: {
      name: "",
      email: "",
      isVerified: false,
      uid: "",
      domains: []
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
