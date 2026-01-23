import type { Access } from "payload";

// Public access - anyone can access
export const anyone: Access = () => true;

// Only authenticated users
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

// Only admins
export const admins: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

// Admins and editors
export const adminsAndEditors: Access = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "editor";
};

// Content creators (admin, editor, author)
export const contentCreators: Access = ({ req: { user } }) => {
  return (
    user?.role === "admin" || user?.role === "editor" || user?.role === "author"
  );
};

// Widget creators (admin, widgetCreator)
export const widgetCreators: Access = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "widgetCreator";
};

// Admins see all, others only their own
export const adminsOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  return {
    id: { equals: user.id },
  };
};
