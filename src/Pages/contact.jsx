import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="section section-white min-h-screen">
      <div className="page-container max-w-5xl">

        <div className="mb-14 text-center">
          <p className="section-label">Get in Touch</p>
          <h1 className="page-title mt-3">Contact Us</h1>
          <p className="page-subtitle mx-auto max-w-lg">
            Have a question? Our team is here to help with orders, products, and support.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            {[
              { icon: FaPhoneAlt, title: "Phone", lines: ["+252 61 XXXXXXX", "+252 62 XXXXXXX"] },
              { icon: FaEnvelope, title: "Email", lines: ["support@electroshop.com", "sales@electroshop.com"] },
              { icon: FaMapMarkerAlt, title: "Office", lines: ["Km4, Maka Al-mukarama Rd", "Mogadishu, Somalia"] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="card flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="mt-1 text-sm text-slate-500">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card p-8 lg:col-span-2">
            {submitted && (
              <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Name</label>
                  <input type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="abdifatah abdi" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</label>
                  <input type="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="abdifatah@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Subject</label>
                <input type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Message</label>
                <textarea rows="5" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary gap-2">
                <FaPaperPlane size={12} /> Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;
