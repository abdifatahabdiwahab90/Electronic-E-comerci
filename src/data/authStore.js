export const USERS_KEY = "electroUsers";
export const SESSION_KEY = "electroSession";
export const AUTH_EVENT = "electro-auth-change";

const defaultUsers = [
  { name: "Admin", email: "admin@electroshop.com", password: "admin123", role: "admin" },
];

export function notifyAuthChange() {
  window.dispatchEvent(new CustomEvent(AUTH_EVENT));
}

export function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    const users = JSON.parse(stored);
    return users.map((u) => ({
      ...u,
      role: u.role || (u.email === "admin@electroshop.com" ? "admin" : "customer"),
    }));
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setSession(user) {
  const session = {
    name: user.name,
    email: user.email,
    role: user.role || "customer",
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notifyAuthChange();
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  notifyAuthChange();
}

export function isAdmin(session) {
  return session?.role === "admin";
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email.trim() && u.password === password);
  if (!user) return null;
  return setSession(user);
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  const trimmedEmail = email.trim();
  if (users.some((u) => u.email === trimmedEmail)) {
    return { error: "This email is already registered." };
  }
  const newUser = { name: name.trim(), email: trimmedEmail, password, role: "customer" };
  saveUsers([...users, newUser]);
  return { user: newUser };
}

export function getRedirectPath(session) {
  return isAdmin(session) ? "/admin-portal" : "/my-orders";
}
