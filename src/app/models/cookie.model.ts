export interface Cookie {
  cookieId: string;
  cookieName: string;
  expirationDate: Date;
  domainName: string;
  group: {
    id: string;
    name: string;
  };
  provider: string;
}
