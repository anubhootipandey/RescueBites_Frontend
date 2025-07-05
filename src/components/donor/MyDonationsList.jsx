// components/donor/MyDonationsList.jsx
import React, { useEffect, useState } from "react";
import { getMyDonations } from "../../services/donorService";

const MyDonationsList = ({ token, refreshTrigger }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getMyDonations(token);
      setDonations(res.data);
    }
    fetchData();
  }, [token, refreshTrigger]); // refresh when refreshTrigger changes

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <ul className="space-y-3">
          {donations.map((d) => (
            <li key={d._id} className="p-3 border rounded bg-gray-50">
              <strong>{d.foodType}</strong> - {d.quantity}kg - Status:{" "}
              <span className="font-semibold">{d.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDonationsList;
