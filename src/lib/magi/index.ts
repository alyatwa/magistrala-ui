import SDK from "@absmach/magistrala-sdk";

const defaultUrl = "http://localhost";

const mgSdk = new SDK({
  clientsUrl: `${defaultUrl}:9006`,
  channelsUrl: `${defaultUrl}:9007`,
  domainsUrl: `${defaultUrl}:9008`,
  groupsUrl: `${defaultUrl}:9009`,
});

const token = "<token>";
const domainId = "<domainId>";

type WithAuth<T> = {
  [K in keyof T]: T[K] extends (...args: [...infer P, any, any]) => infer R
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

// 3) Wrap once, now all calls auto‐inject auth and only need the “real” params
export const clients = withAuth(mgSdk.Clients, domainId, token);

// clients
//   .CreateClient({ name: "acme" })
//   .then((r) => console.log(r))
//   .catch(console.error);

// mgSdk.Clients.CreateClient({ name: "<clientName>" }, domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.Disable("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.Enable("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.UpdateClient(
//   { id: "<clientId>", name: "<clientName>" },
//   domainId,
//   token
// )
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.UpdateClientSecret(
//   { id: "<clientId>", credentials: { secret: "newSecret" } },
//   domainId,
//   token
// )
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.UpdateClientTags(
//   { id: "<clientId>", tags: ["<tag1>", "<tag2>"] },
//   domainId,
//   token
// )
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.Clients({ offset: 0, limit: 10 }, domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.Client("<clientId>", domainId, token, false)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteClient("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.setClientParentGroup(
//   domainId,
//   "<clientId>",
//   "<parentGroupId>",
//   token
// )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteClientParentGroup(domainId, "<clientId>", token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.CreateClients(
//   [{ name: "<clientName1>" }, { name: "<clientName2>" }],
//   domainId,
//   token
// )
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.ListClientActions(domainId, token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.CreateClientRole("<clientId>", "<roleName>", domainId, token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.ListClientRoles(
//   "<clientId>",
//   domainId,
//   { offset: 0, limit: 10 },
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.ViewClientRole("<clientId>", domainId, "<roleId>", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.UpdateClientRole(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   { name: "<updatedRoleName>" },
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteClientRole("<clientId>", domainId, "<roleId>", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.AddClientRoleActions(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   ["<action>", "<action>"],
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.ListClientRoleActions("<clientId>", domainId, "<roleId>", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteClientRoleActions(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   ["<action>", "<action>"],
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteAllClientRoleActions(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.AddClientRoleMembers(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   ["<userId>", "<userId>"],
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.ListClientRoleMembers(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   { offset: 0, limit: 10 },
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteClientRoleMembers(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   ["<userId>", "<userId>"],
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.DeleteAllClientRoleMembers(
//   "<clientId>",
//   domainId,
//   "<roleId>",
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mgSdk.Clients.ListClientMembers(
//   "<clientId>",
//   domainId,
//   { offset: 0, limit: 10 },
//   token
// )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
