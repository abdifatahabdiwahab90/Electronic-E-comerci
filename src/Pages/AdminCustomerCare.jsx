import { useState, Fragment } from "react";
import { FaEnvelope, FaChevronDown, FaChevronUp, FaTrash, FaHeadset } from "react-icons/fa";
import {
  useContactStore,
  CONTACT_STATUSES,
  getStatusMeta,
  formatContactDate,
} from "../data/contactStore";

function AdminCustomerCare() {
  const { contacts, stats, updateStatus, deleteContact } = useContactStore();
  const [expandedId, setExpandedId] = useState(null);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    const contact = contacts.find((c) => c.id === id);
    if (contact?.status === "new") updateStatus(id, "read");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this message?")) deleteContact(id);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Customer Care</h1>
        <p className="mt-1 text-sm text-slate-500">
          {stats.total} messages · {stats.new} new · {stats.resolved} resolved
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total, color: "text-primary" },
          { label: "New", value: stats.new, color: "text-blue-600" },
          { label: "Read", value: stats.read, color: "text-amber-600" },
          { label: "Resolved", value: stats.resolved, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {contacts.length === 0 ? (
          <div className="px-6 py-16 text-center text-slate-400">
            <FaHeadset className="mx-auto mb-3 text-3xl text-slate-300" />
            <p>No messages yet. They appear when customers submit the contact form.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700">
              <tr>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contacts.map((c) => {
                const meta = getStatusMeta(c.status);
                const isExpanded = expandedId === c.id;
                return (
                  <Fragment key={c.id}>
                    <tr className={`hover:bg-slate-50/50 ${c.status === "new" ? "bg-blue-50/30" : ""}`}>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{c.subject}</p>
                        {!isExpanded && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">{c.message}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs">{formatContactDate(c.createdAt)}</td>
                      <td className="px-6 py-4">
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c.id, e.target.value)}
                          className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${meta.color} cursor-pointer`}
                        >
                          {CONTACT_STATUSES.map((s) => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleExpand(c.id)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                          >
                            {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="bg-slate-50 px-6 py-4">
                          <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <FaEnvelope size={14} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold uppercase text-slate-400">Message</p>
                              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{c.message}</p>
                              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                                <span>From: <strong className="text-slate-600">{c.name}</strong></span>
                                <span>Email: <strong className="text-slate-600">{c.email}</strong></span>
                                <span>ID: <strong className="font-mono text-slate-600">{c.id}</strong></span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminCustomerCare;
