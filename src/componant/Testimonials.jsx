import SectionHeader from "./SectionHeader";

const reviews = [
  {
    name: "abdifatah abdi",
    role: "Verified Buyer",
    text: "Exceptional quality and fast delivery. The laptop I ordered exceeded my expectations in every way.",
    stars: 5,
  },
  {
    name: "abdisalam  abdi",
    role: "Tech Enthusiast",
    text: "Clean website, easy checkout, and genuine products. ElectroShop is now my go-to electronics store.",
    stars: 5,
  },
  {
    name: "abdifatah abdi.",
    role: "Pro Gamer",
    text: "Great gaming gear selection with competitive prices. Customer support was helpful and responsive.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section section-muted border-t border-slate-100">
      <div className="page-container">
        <SectionHeader
          label="Testimonials"
          title="Trusted by Thousands"
          subtitle="Real feedback from customers who shop with us."
          center
        />

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev) => (
            <div key={rev.name} className="card flex flex-col p-6">
              <div className="text-amber-400 text-sm tracking-widest">
                {"★".repeat(rev.stars)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                "{rev.text}"
              </p>
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-sm font-medium text-slate-900">{rev.name}</p>
                <p className="text-xs text-slate-400">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
