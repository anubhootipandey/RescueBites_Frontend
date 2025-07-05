// pages/Donor.jsx
import React, { useState } from 'react';
import DonorDashboard from '../components/donor/DonorDashboard';
// import AddDonationForm from '../components/donor/AddDonationForm';
// import MyDonationsList from '../components/donor/MyDonationsList';

const Donor = () => {
  const token = localStorage.getItem("token");
  // const [refreshFlag, setRefreshFlag] = useState(false);

  // const handleDonationAdded = () => {
  //   setRefreshFlag(prev => !prev); 
  // };

  if (!token) return <p>Please login</p>;

  return (
    <div className="space-y-6">
      <DonorDashboard token={token} />
      {/* <AddDonationForm token={token} onDonationAdded={handleDonationAdded} /> */}
      {/* <MyDonationsList token={token} refreshTrigger={refreshFlag} /> */}
    </div>
  );
};

export default Donor;
