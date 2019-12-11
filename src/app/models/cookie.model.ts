export interface Cookie {
  cookieId: string;
  cookieName: string;
  expirationDate: string;
  domainName: string;
  group: {
    gid: string;
    name: string;
    groupActive: boolean;
  };
  provider: string;
}
