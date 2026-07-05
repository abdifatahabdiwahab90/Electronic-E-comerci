

function TeamSection() {
  const team = [
    {
      id: 1,
      name: "Alex Chen",
      role: "CEO & Founder",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Head of Products",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "CTO",
      image:
        "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      id: 4,
      name: "Emma Patel",
      role: "Head of Design",
      image:
        "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
            Our Team
          </span>

          <h2 className="text-5xl font-bold text-slate-900 mt-6">
            The People Behind ElecZone
          </h2>

          <p className="text-gray-500 mt-4">
            Passionate technologists, designers, and customer champions.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {team.map((member) => (

            <div
              key={member.id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center p-8 group"
            >

              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
              />

              <h3 className="text-xl font-bold mt-6">
                {member.name}
              </h3>

              <p className="text-blue-600 mt-2 font-medium">
                {member.role}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TeamSection;