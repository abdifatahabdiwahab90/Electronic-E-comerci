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
    <div className="bg-white min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Nala Soo Xiriir</h1>
          <p className="text-gray-500">
            Waxaad qabtaa su'aal ku saabsan alaabta? Mise waxaad u baahan tahay caawinaad farsamo? Fariin noogu reeb foomka hoose.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* MIDIG/BIDIX: Xogta xiriirka (Contact Info) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 border border-gray-150 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Taleefanka</h3>
                <p className="text-gray-500 text-sm mt-1">+252 61 XXXXXXX</p>
                <p className="text-gray-500 text-sm">+252 62 XXXXXXX</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-150 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <FaEnvelope size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Email-ka Na caawi</h3>
                <p className="text-gray-500 text-sm mt-1">support@techstore.com</p>
                <p className="text-gray-500 text-sm">sales@techstore.com</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-150 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Xafiiska Dhabta ah</h3>
                <p className="text-gray-500 text-sm mt-1">Km4 Area, Wadada Maka Al-mukarama</p>
                <p className="text-gray-500 text-sm">Mogadishu, Somalia</p>
              </div>
            </div>
          </div>

          {/* FOOMKA: Farriin dirista (Message Form) */}
          <div className="lg:col-span-2 bg-gray-50 border border-gray-150 p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Noo Soo Dir Farriin</h2>
            
            {submitted && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 font-medium text-sm">
                Waad ku mahadsan tahay nala soo xiriirkaaga! Fariintaadu si guul ah ayay noogu soo gaartay.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Magacaaga</label>
                  <input type="text" required className="w-full mt-1 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-blue-600" placeholder="Ahmad Mahamed" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Email-kaaga</label>
                  <input type="email" required className="w-full mt-1 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-blue-600" placeholder="ahmad@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Dulucda Fariinta (Subject)</label>
                <input type="text" required className="w-full mt-1 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-blue-600" placeholder="Su'aal ku saabsan dammaanadda laptop" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Farriintaada</label>
                <textarea rows="5" required className="w-full mt-1 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-blue-600" placeholder="Halkaan ku qor fariintaada oo faahfaahsan..."></textarea>
              </div>
              
              <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-bold flex items-center justify-center gap-2">
                <FaPaperPlane size={14} /> Dir Farriinta
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;