import { useState, useEffect, useCallback, useMemo } from "react";
import { addActivity, STORAGE_EVENT } from "./productStore";

export const CONTACTS_KEY = "electroContacts";

export const CONTACT_STATUSES = [
  { id: "new", label: "New", color: "bg-blue-50 text-blue-600" },
  { id: "read", label: "Read", color: "bg-amber-50 text-amber-600" },
  { id: "resolved", label: "Resolved", color: "bg-green-50 text-green-600" },
];

export function getStatusMeta(statusId) {
  return CONTACT_STATUSES.find((s) => s.id === statusId) ?? CONTACT_STATUSES[0];
}

function dispatchUpdate() {
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

function readContacts() {
  try {
    const stored = localStorage.getItem(CONTACTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return [];
}

function writeContacts(contacts) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  dispatchUpdate();
}

export function getContacts() {
  return readContacts();
}

export function submitContact({ name, email, subject, message }) {
  const contact = {
    id: `MSG-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  writeContacts([contact, ...readContacts()]);
  addActivity(`New message: ${contact.subject} — ${contact.name}`, "contact");
  return contact;
}

export function updateContactStatus(id, status) {
  const contacts = readContacts();
  const idx = contacts.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], status };
  writeContacts(contacts);
  return contacts[idx];
}

export function deleteContact(id) {
  const contacts = readContacts();
  const removed = contacts.find((c) => c.id === id);
  writeContacts(contacts.filter((c) => c.id !== id));
  if (removed) addActivity(`Deleted message: ${removed.subject}`, "contact");
}

export function formatContactDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getContactStats() {
  const contacts = readContacts();
  return {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    read: contacts.filter((c) => c.status === "read").length,
    resolved: contacts.filter((c) => c.status === "resolved").length,
  };
}

export function useContactStore() {
  const [contacts, setContacts] = useState(() => getContacts());

  const refresh = useCallback(() => {
    setContacts(getContacts());
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CONTACTS_KEY) refresh();
    };
    window.addEventListener(STORAGE_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(STORAGE_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const stats = useMemo(() => getContactStats(), [contacts]);

  const submit = useCallback(
    (data) => {
      const result = submitContact(data);
      refresh();
      return result;
    },
    [refresh]
  );

  const updateStatus = useCallback(
    (id, status) => {
      updateContactStatus(id, status);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id) => {
      deleteContact(id);
      refresh();
    },
    [refresh]
  );

  return { contacts, stats, submitContact: submit, updateStatus, deleteContact: remove, refresh };
}
