import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 1. Waxaan soo innihay useNavigate
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";
// Waxaan ku darnay astaamo qurux u yeelaya bogga
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight } from "react-icons/fa";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Waxaan halkan ku dhalinnay navigate
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Haddii dambiishu madhan tahay (Empty Cart UI)
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-24 text-center px-4 flex flex-col items-center justify-center">
        <div className="bg-gray-100 p-6 rounded-full text-blue-600 mb-6 animate-bounce">
          <FaShoppingBag size={50} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">Dambiishaadu waa maran tahay</h1>
        <p className="mt-3 text-gray-500 text-lg max-w-md">
          U noqo dukaanka weyn si aad u soo iibsato alaabada aad u baahan tehay.
        </p>
        {/* 3. "Sii wad Adeegashada" wuxuu kuu celinayaa bogga Categories/Shop */}
        <button 
          onClick={() => navigate('/categories')} 
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-medium transition shadow-lg shadow-blue-200"
        >
          Sii wad Adeegashada
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
        <FaShoppingBag className="text-blue-600" /> Dambiisha Adeegga ({cartItems.length})
      </h1>

      {/* Grid Layout: Alaabta iyo Isku-darka Qiimaha waa la kala saaray */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* BIDIX: Liiska Alaabta ku jirta Cart-ka */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl p-5 gap-4 transition"
            >
              {/* Sawirka iyo Magaca */}
              {/* 4. Marka la gujiyo sawirka ama magaca wuxuu toos u geynayaa bogga ProductView */}
              <div 
                onClick={() => navigate(`/products/${item.id}`)} 
                className="flex items-center gap-5 w-full sm:w-auto cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-105 transition duration-300"
                />
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-gray-800 truncate sm:whitespace-normal group-hover:text-blue-600 transition">
                    {item.name}
                  </h2>
                  <p className="text-blue-600 font-bold text-xl mt-1">
                    ${item.price}
                  </p>
                </div>
              </div>

              {/* Maareynta Tirada iyo Badanka Tiridda */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Badannada + iyo - */}
                <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="hover:bg-white text-gray-600 p-2 rounded-lg transition hover:text-blue-600"
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="px-4 font-bold text-gray-800 text-sm min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="hover:bg-white text-gray-600 p-2 rounded-lg transition hover:text-blue-600"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                {/* Badanka Remove (Astaanta Qashinka) */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-gray-400 hover:text-red-600 p-2.5 hover:bg-red-50 rounded-xl transition"
                  title="Ka saar dambiisha"
                >
                  <FaTrash size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* MIDIG: Kooban (Order Summary Card) */}
        <div className="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5 pb-3 border-b border-gray-200">
            Xogta Dalabka (Summary)
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Alaabta guud:</span>
              <span className="font-medium">{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} xubnood</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Nooliga/Kariinka:</span>
              <span className="text-green-600 font-medium">Bilaash (Free)</span>
            </div>
            
            <div className="border-t border-gray-200 my-4 pt-4 flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-800">Wadar ahaan:</span>
              <span className="text-2xl font-black text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <button className="w-full mt-6 bg-blue-600 text-white py-3.5 px-6 rounded-xl hover:bg-blue-700 transition font-bold shadow-md shadow-blue-200 flex items-center justify-center gap-2 group">
            U gudub Lacag-bixinta
            <FaArrowRight size={14} className="group-hover:translate-x-1 transition duration-200" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;