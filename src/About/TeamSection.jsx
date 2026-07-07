function TeamSection() {
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Abdifatah Abdi"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
            />

            <h3 className="text-xl font-bold mt-6">
              Abdifatah Abdi
            </h3>

            <p className="text-blue-600 font-medium mt-2">
              CEO & Founder
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group">
            <img
              src="https://i.pinimg.com/1200x/ef/12/27/ef1227f09c96e0d558c444d163aaccd5.jpg"
              alt="Asha"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
            />

            <h3 className="text-xl font-bold mt-6">
              Ms Asha
            </h3>

            <p className="text-blue-600 font-medium mt-2">
              Head of Products
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group">
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              alt="Abdisalam Abdi"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
            />

            <h3 className="text-xl font-bold mt-6">
              Abdisalam Abdi
            </h3>

            <p className="text-blue-600 font-medium mt-2">
              CTO
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group">
            <img
              src="https://i.pinimg.com/1200x/b6/8a/ff/b68aff97784fd1ca5ec17d1eeb7e2ac8.jpg"
              alt="Maryan"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
            />

            <h3 className="text-xl font-bold mt-6">
              Ms Maryan
            </h3>

            <p className="text-blue-600 font-medium mt-2">
              Head of Design
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TeamSection;