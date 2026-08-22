import { useProductStore } from "../data/productStore";

function ApiStatusBanner() {
  const { error } = useProductStore();
  if (!error) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">
      Could not load shop data. Make sure the backend is running on port 5000 and MongoDB is connected.
      <span className="ml-2 text-amber-600">({error})</span>
    </div>
  );
}

export default ApiStatusBanner;
