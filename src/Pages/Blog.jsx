import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

function Blog() {
  const blogs = [
    {
      id: 1,
      title: "5-ta Laptop ee ugu fiican ardayda Jaamacadda ee 2026",
      excerpt: "Haddii aad tahay arday baranaya Computer Science ama Business, kuwani waa laptop-yada ugu habboon ee qiimaha iyo tayada isku lahaansanaya...",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
      date: "July 01, 2026",
      author: "Eng. Ahmad"
    },
    {
      id: 2,
      title: "Sida loo daryeelo batteriga telefoonkaaga si uu u raago",
      excerpt: "Ma ka cabanaysaa in batterigaagu si dhaqso ah u dhinto? Casharkaan waxaan ku baraynaa caadooyin khaldan oo dhaawaca nolosha batteriga...",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      date: "June 28, 2026",
      author: "Anisa Ali"
    },
    {
      id: 3,
      title: "Waa maxay farqiga u dhexeeya shaashadaha OLED iyo LCD?",
      excerpt: "Kahor intaadan iibsan TV ama Telefoon cusub, baro farqiga weyn ee u dhexeeya labadaan farsamo ee shaashadaha iyo midka indhaha u roon...",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500",
      date: "June 15, 2026",
      author: "Eng. Ahmad"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Tech Blog & Wararka</h1>
          <p className="text-gray-500">
            La soco wararkii ugu dambeeyey ee dunida tiknoolajiyada, casharro wax ku ool ah, iyo talooyin ku saabsan qalabka korontada.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article key={post.id} className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              {/* Sawirka Maqaalka */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Qoraalka Maqaalka */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta (Taariikhda & Qoraaga) */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUser />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50">
                  <button className="text-blue-600 font-bold text-sm flex items-center gap-1.5 hover:text-blue-700 transition group">
                    Akhriso Maqaalka 
                    <FaArrowRight size={12} className="group-hover:translate-x-1 transition duration-200" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Blog;