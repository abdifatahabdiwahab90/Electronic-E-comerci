import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "./api";
export const CONTACT_STATUSES = [{ id: "new", label: "New", color: "bg-blue-50 text-blue-600" }, { id: "read", label: "Read", color: "bg-amber-50 text-amber-600" }, { id: "resolved", label: "Resolved", color: "bg-green-50 text-green-600" }];
export const getStatusMeta = (status) => CONTACT_STATUSES.find((item) => item.id === status) || CONTACT_STATUSES[0];
export const formatContactDate = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
export function useContactStore() {
  const [contacts, setContacts] = useState([]); const refresh = useCallback(async () => { try { setContacts(await api("/contacts")); } catch { setContacts([]); } }, []); useEffect(() => { refresh(); }, [refresh]);
  const stats = useMemo(() => ({ total: contacts.length, new: contacts.filter((c) => c.status === "new").length, read: contacts.filter((c) => c.status === "read").length, resolved: contacts.filter((c) => c.status === "resolved").length }), [contacts]);
  const submitContact = async (data) => { try { const contact = await api("/contacts", { method: "POST", body: JSON.stringify(data) }); return contact; } catch (error) { return { error: error.message }; } };
  const updateStatus = async (id, status) => { await api(`/contacts/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }); await refresh(); };
  const deleteContact = async (id) => { await api(`/contacts/${id}`, { method: "DELETE" }); await refresh(); };
  return { contacts, stats, submitContact, updateStatus, deleteContact, refresh };
}
