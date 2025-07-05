







import { useEffect, useState } from "react";
import axios from "axios";

export default function Recipient() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    neededItems: "",
    address: "",
  });

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      const res = await axios.get(
        "http://localhost:7001/api/recipient/my-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching your requests", err);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:7001/api/recipient/request",
      {
        neededItems: formData.neededItems,
        address: formData.address,
        donationId: "123", 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Request submitted!");
    setFormData({ neededItems: "", address: "" }); // clear form
    fetchMyRequests(); // refresh list
  } catch (err) {
    console.error("Error submitting request", err);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipient Panel</h1>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div>
          <label className="block">Needed Items:</label>
          <input
            type="text"
            value={formData.neededItems}
            onChange={(e) =>
              setFormData({ ...formData, neededItems: e.target.value })
            }
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mt-2">
          <label className="block">Address:</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>

      {/* Display Your Requests */}
      <h2 className="text-xl font-semibold mb-2">My Food Requests</h2>
      <ul className="space-y-2">
        {requests.length === 0 && <p>No requests found.</p>}
        {requests.map((r) => (
          <li key={r._id} className="border p-3 rounded shadow">
            <p>
              <strong>Items:</strong> {r.neededItems}
            </p>
            <p>
              <strong>Address:</strong> {r.address}
            </p>
            <p>
              <strong>Status:</strong> {r.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
