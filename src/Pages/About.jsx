import { FaRocket, FaShieldAlt, FaUsers, FaAward } from "react-icons/fa";

function About() {
  const stats = [
    { id: 1, label: "Macaamiil ku qanacsan", value: "20k+" },
    { id: 2, label: "Alaabood oo la iibiyey", value: "50k+" },
    { id: 3, label: "Magaalooyin aan gaarno", value: "15+" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Qaybta */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Hadafkayaga Tiknoolajiyada</h1>
          <p className="text-gray-500 text-lg">
            Waxaan nahay dukaanka ugu horreeya ee dalka u keena qalabka elektaroonigga ah ee ugu tayada sarreeya, annagoo dammaanad buuxda siinaya macaamiisheena tan iyo markii la aas-aasay.
          </p>
        </div>

        {/* Labada Tiir (Gogoldhigga) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600" 
              alt="Our office" 
              className="rounded-2xl shadow-lg object-cover h-80 w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Maxaa nagu gaar ah?</h2>
            <p className="text-gray-650 leading-relaxed">
              Waxaan aaminsanahay in qalabka elektaroonigga ah ee casriga ah uu yahay mid muhiim u ah nolosha maalinlaha ah iyo horumarka ganacsiyada. Sidaa darteed, waxaan si toos ah alaabta uga soo qaadnaa shirkadaha rasmiga ah ee caalamka.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-blue-600 text-xl flex-shrink-0" />
                <span className="font-medium text-gray-750">Dammaanad 100%</span>
              </div>
              <div className="flex items-center gap-3">
                <FaRocket className="text-blue-600 text-xl flex-shrink-0" />
                <span className="font-medium text-gray-750">Gudbin Degdeg ah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lambarada Muhiimka ah (Stats) */}
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-25 shadow-xl shadow-blue-100">
          {stats.map((stat) => (
            <div key={stat.id}>
              <p className="text-4xl md:text-5xl font-black mb-2">{stat.value}</p>
              <p className="text-blue-100 font-medium text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Hogaanka Dukaanka (Team) */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Kooxda Maamulka</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
                alt="Founder" 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-blue-100"
              />
              <h3 className="font-bold text-lg text-gray-800">Magacaaga</h3>
              <p className="text-sm text-blue-600 font-medium mt-1">Founder & Lead Developer</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;