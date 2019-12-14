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
      cid: "",
      name: "",
      expDate: null,
      active: false,
      domain: {
        name: "",
        active: false,
        did: ""
      },
      group: {
        gid: "",
        name: "",
        active: false
      },
      provider: ""
    }
  ]
};
