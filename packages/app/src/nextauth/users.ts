import "server-only";

export const Permissions = ["homepage:read"];

export type Permission = (typeof Permissions)[number];

interface User {
  email: string;
  name: string;
  permissions: Permission[];
}

const allowedUsers: User[] = [
  {
    email: "maythan.pt@gmail.com",
    name: "May Than",
    permissions: Permissions,
  },

  {
    email: "thanthan.nu@veritus.ai",
    name: "Veritus Admin",
    permissions: Permissions,
  },
];

export const getUserByEmail = (email: string): undefined | User => {
  return allowedUsers.find((user) => user.email === email.toLowerCase());
};
export const ensurePermissionsAsync = async (
  email: string,
  permissions: Permission[]
) => {
  await Promise.resolve();
  const user = getUserByEmail(email);
  if (!user) throw new Error("User not found");
  for (const permission of permissions) {
    if (!user.permissions.includes(permission))
      throw new Error("Permission denied");
  }
  return { permissions, user };
};
