


import React from 'react';

const reviews = [
  { name: "Justin Taylor", role: "Verified Buyer", text: "The processing latency is non-existent. Blown away by the UI clean aesthetics and responsiveness of this tech interface setup.", stars: 5 },
  { name: "Sarah Vance", role: "Tech Enthusiast", text: "Customer service helped me source alternative setups within hours. Product arrived next day pristine packaging.", stars: 5 },
  { name: "Michael K.", role: "Pro Gamer", text: "Fantastic builds, durable finishes, layout is highly intuitive. Highly recommended for workspace modifications.", stars: 5 }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-100/60 border-y border-gray-200/50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Reviews</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-amber-400">{"★".repeat(rev.stars)}</div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{rev.text}"</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}