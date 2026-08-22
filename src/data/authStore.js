import { api, setApiToken } from "./api";

export const AUTH_EVENT = "electro-auth-change";
const SESSION_KEY = "electro-session";
const TOKEN_KEY = "electro-token";

function loadSession() {
  try {
    const savedSession = window.localStorage.getItem(SESSION_KEY);
    const savedToken = window.localStorage.getItem(TOKEN_KEY);
    if (!savedSession || !savedToken) return null;
    setApiToken(savedToken);
    return JSON.parse(savedSession);
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

let currentSession = loadSession();

export function notifyAuthChange() { window.dispatchEvent(new CustomEvent(AUTH_EVENT)); }
export function getSession() { return currentSession; }
export function setSession(user, token) {
  currentSession = { name: user.name, email: user.email, role: user.role || "customer" };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
  window.localStorage.setItem(TOKEN_KEY, token);
  setApiToken(token);
  notifyAuthChange();
  return currentSession;
}
export function clearSession() {
  currentSession = null;
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  setApiToken(null);
  notifyAuthChange();
}
export function isAdmin(session) { return session?.role === "admin"; }

export async function loginUser(email, password) {
  try { const { user, token } = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }); return setSession(user, token); } catch { return null; }
}

export async function registerUser(data) {
  try { const user = await api("/auth/register", { method: "POST", body: JSON.stringify(data) }); return user; } catch (error) { return { error: error.message }; }
}

export function getRedirectPath(session) { return isAdmin(session) ? "/admin-portal" : "/my-orders"; }
