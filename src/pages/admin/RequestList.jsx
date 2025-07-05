import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:7001/api/admin/requests", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:7001/api/admin/requests/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchRequests();
  };

  const completeRequest = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:7001/api/admin/requests/complete/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Food Requests</h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req._id} className="border p-4 rounded bg-white shadow-md">
            <p><strong>Recipient:</strong> {req.recipientId?.username}</p>
            <p><strong>Items:</strong> {req.neededItems}</p>
            <p><strong>Address:</strong> {req.address}</p>
            <p><strong>Status:</strong> {req.status}</p>

            <div className="mt-2 space-x-2">
              {req.status === "pending" && (
                <>
                  <button onClick={() => updateStatus(req._id, "approved")} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                  <button onClick={() => updateStatus(req._id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                </>
              )}
              {req.status === "approved" && (
                <button onClick={() => completeRequest(req._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Mark Completed</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
