import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const PreviousServices = () => {
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const fetchRepairs = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("https://rapidm2b.onrender.com/api/repairs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setRepairs(data);
    };

    fetchRepairs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-black via-gray-700 to-gray-500 text-white">
        <h1 className="text-3xl font-bold mb-6 underline">Previous Services</h1>

        {repairs.length === 0 ? (
          <p>No previous services found.</p>
        ) : (
          <div className="space-y-4">
            {repairs.map((r) => (
              <div
                key={r._id}
                className="bg-white text-black p-4 rounded-lg shadow-md"
              >
                <p><strong>Model:</strong> {r.mobileModel}</p>
                <p><strong>Problem:</strong> {r.problem}</p>
                <p><strong>Date:</strong> {new Date(r.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PreviousServices;
