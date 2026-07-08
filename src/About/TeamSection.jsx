import Abdifitah from "../assets/Abdifitah.png";
import Abdisalam from "../assets/Abdisalam.jpeg";

function TeamSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
            Our Team
          </span>

          <h2 className="text-5xl font-bold text-slate-900 mt-6">
            The People Behind ElectroShop
          </h2>

          <p className="text-gray-500 mt-4">
            Passionate technologists, designers, and customer champions.
          </p>
        </div>

        {/* Grid-ka labada qofood */}
        <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">

          {/* Abdifitah Abdi - Card-ka 1aad */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group">
            <img
              src={Abdisalam}
              alt="Abdifitah Abdi"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
            />

            <h3 className="text-xl font-bold mt-6">
              Abdisalam Abdullahi

            </h3>

            <p className="text-blue-600 font-medium mt-2">
              CEO & Founder
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 text-center group">
            <img
              src={Abdifitah}
              alt="Abdisalam Abdullahi"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-100 group-hover:scale-110 transition duration-300"
            />

            <h3 className="text-xl font-bold mt-6">
               Abdifitah Abdi
            </h3>

            <p className="text-blue-600 font-medium mt-2">
              Head of Products
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TeamSection;