import SDK from "@absmach/magistrala-sdk";

const defaultUrl = "http://localhost";

export const mgSdk = new SDK({
  clientsUrl: `${defaultUrl}:9006`,
  channelsUrl: `${defaultUrl}:9007`,
  domainsUrl: `${defaultUrl}:9008`,
  groupsUrl: `${defaultUrl}:9009`,
  alarmsUrl: `${defaultUrl}:9010`,
  usersUrl: `${defaultUrl}:9011`,
  rulesUrl: `${defaultUrl}:9012`,
  authUrl: `${defaultUrl}:9001`,
});

export const token = "<token>";
export const domainId = "<domainId>";

type WithAuth<T> = {
  [K in keyof T]: T[K] extends (...args: [...infer P, any, any]) => infer R
    ? (...args: P) => R
    : T[K];
};

type WithTokenOnly<T> = {
  [K in keyof T]: T[K] extends (...args: [...infer P, any]) => infer R
    ? (...args: P) => R
    : T[K];
};

type WithInvitationAuth<T> = {
  [K in keyof T]: K extends "SendInvitation"
    ? (userId: string, roleId: string, resend?: boolean) => Promise<Response>
    : T[K] extends (...args: [...infer P, any, any]) => infer R
    ? (...args: P) => R
    : T[K];
};

function withAuth<T extends Record<string, any>>(
  api: T,
  domainId: string,
  token: string
): WithAuth<T> {
  const bound = {} as any;

  // Copy enumerable properties
  for (const key in api) {
    const fn = api[key];
    if (typeof fn === "function") {
      bound[key] = ((...args: any[]) => fn(...args, domainId, token)) as any;
    }
  }

  // Copy prototype methods (non-enumerable)
  const proto = Object.getPrototypeOf(api);
  if (proto && proto !== Object.prototype) {
    const propertyNames = Object.getOwnPropertyNames(proto);
    for (const key of propertyNames) {
      if (
        key !== "constructor" &&
        typeof api[key] === "function" &&
        !bound[key]
      ) {
        bound[key] = ((...args: any[]) =>
          api[key](...args, domainId, token)) as any;
      }
    }
  }

  return bound as WithAuth<T>;
}

function withTokenOnly<T extends Record<string, any>>(
  api: T,
  token: string
): WithTokenOnly<T> {
  const bound = {} as any;

  // Copy enumerable properties
  for (const key in api) {
    const fn = api[key];
    if (typeof fn === "function") {
      bound[key] = ((...args: any[]) => fn(...args, token)) as any;
    }
  }

  // Copy prototype methods (non-enumerable)
  const proto = Object.getPrototypeOf(api);
  if (proto && proto !== Object.prototype) {
    const propertyNames = Object.getOwnPropertyNames(proto);
    for (const key of propertyNames) {
      if (
        key !== "constructor" &&
        typeof api[key] === "function" &&
        !bound[key]
      ) {
        bound[key] = ((...args: any[]) => api[key](...args, token)) as any;
      }
    }
  }

  return bound as WithTokenOnly<T>;
}

function withInvitationAuth<T extends Record<string, any>>(
  api: T,
  domainId: string,
  token: string
): WithInvitationAuth<T> {
  const bound = {} as any;

  // Copy enumerable properties
  for (const key in api) {
    const fn = api[key];
    if (typeof fn === "function") {
      if (key === "SendInvitation") {
        bound[key] = ((userId: string, roleId: string, resend?: boolean) =>
          fn(userId, domainId, roleId, token, resend)) as any;
      } else {
        bound[key] = ((...args: any[]) => fn(...args, domainId, token)) as any;
      }
    }
  }

  // Copy prototype methods (non-enumerable)
  const proto = Object.getPrototypeOf(api);
  if (proto && proto !== Object.prototype) {
    const propertyNames = Object.getOwnPropertyNames(proto);
    for (const key of propertyNames) {
      if (
        key !== "constructor" &&
        typeof api[key] === "function" &&
        !bound[key]
      ) {
        if (key === "SendInvitation") {
          bound[key] = ((userId: string, roleId: string, resend?: boolean) =>
            api[key](userId, domainId, roleId, token, resend)) as any;
        } else {
          bound[key] = ((...args: any[]) =>
            api[key](...args, domainId, token)) as any;
        }
      }
    }
  }

  return bound as WithInvitationAuth<T>;
}

// 3) Wrap once, now all calls auto‐inject auth and only need the "real" params
export const clients = withAuth(mgSdk.Clients, domainId, token);
export const channels = withAuth(mgSdk.Channels, domainId, token);
export const groups = withAuth(mgSdk.Groups, domainId, token);
export const users = withTokenOnly(mgSdk.Users, token);
export const domains = withAuth(mgSdk.Domains, domainId, token);
export const invitations = withInvitationAuth(mgSdk.Domains, domainId, token);
export const alarms = withAuth(mgSdk.Alarms, domainId, token);
