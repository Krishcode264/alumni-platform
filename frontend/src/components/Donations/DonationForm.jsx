import React, { useState, useEffect } from 'react';
import { create, update, getById } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DonationForm = ({ isEdit = false }) => {
  const [donation, setDonation] = useState({ donor_name: '', amount: '' });
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isEdit) {
      fetchDonation();
    }
  }, [isEdit, id]); 

  const fetchDonation = async () => {
    try {
      const response = await getById('donations', id);
      setDonation(response.data);
    } catch (error) {
      console.error("Error fetching donation:", error);
    }
  };

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await update('donations', id, donation);
      } else {
        await create('donations', donation);
      }
      navigate('/donations'); 
    } catch (error) {
      console.error("Error saving donation:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Donation' : 'Add Donation'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="donor_name"
          placeholder="Donor Name"
          value={donation.donor_name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={donation.amount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
