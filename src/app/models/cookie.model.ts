export interface Cookie {
  cookieId: string;
  cookieName: string;
  expirationDate: string;
  domainName: string;
  group: {
    id: string;
    name: string;
    groupActive: boolean;
  };
  provider: string;
}
