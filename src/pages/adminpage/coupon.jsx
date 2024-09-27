/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { addCoupon, getCoupon,deleteCoupon } from '../../services/admin/login';

const Modal = ({ isOpen, onClose, onSave, coupon, handleInputChange, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} Coupon</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Coupon Name</label>
          <input
            type="text"
            name="Coupon_Name"
            value={coupon.Coupon_Name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Coupon Value</label>
          <input
            type="number"
            name="Coupon_Value"
            value={coupon.Coupon_Value}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Coupon Type</label>
          <select
            name="Coupon_Type"
            value={coupon.Coupon_Type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="percentage">Percentage</option>
            <option value="fixedPrice">Fixed Price</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Start Date</label>
          <input
            type="date"
            name="Start_Date"
            value={coupon.Start_Date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">End Date</label>
          <input
            type="date"
            name="End_Date"
            value={coupon.End_Date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Active Status</label>
          <select
            name="Active_Status"
            value={coupon.Active_Status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'} Coupon</button>
        </div>
      </div>
    </div>
  );
};

const CouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    Coupon_Name: '',
    Coupon_Value: '',
    Coupon_Type: 'percentage',
    Start_Date: '',
    End_Date: '',
    Active_Status: 'active'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editCouponId, setEditCouponId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const fetchCoupons = async () => {
    try {
      const result = await getCoupon();
      console.log("re:", result)
      setCoupons( result.coupons);
      console.log("ff",coupons);
      
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleInputChange = (e) => {
    setNewCoupon({
      ...newCoupon,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCoupon = async () => {
    try {
      const result = await addCoupon(newCoupon);
      console.log("bew",newCoupon);
      
      if (result.success) {
        setCoupons([...coupons, result.coupon]);
        setNewCoupon({
          Coupon_Name: '',
          Coupon_Value: '',
          Coupon_Type: 'percentage',
          Start_Date: '',
          End_Date: '',
          Active_Status: 'active'
        });
        setIsModalOpen(false);
        setIsModalOpen(false);
        setIsEditing(false);
        setEditIndex(null);
        // setEditProductId(null);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error adding coupon:', error.message);
    }
  };

  const DeleteModal = ({ isOpen, onClose, onDelete, coupon }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this coupon?</p>
          <div className="text-center font-semibold mt-4">{coupon.Coupon_Name}</div>
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button onClick={() => { onDelete(coupon._id); onClose(); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteCoupon = async (id) => {
    try {
      const result = await deleteCoupon(id);
      fetchCoupons();
      if (result.success) {
        setCoupons(coupons.filter(coupon => coupon._id !== id));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting coupon:', error.message);
    }
  };

  const handleSaveCoupon = async () => {
    try {
      if (isEditing) {
        const result = await editCoupon(editCouponId, newCoupon);
        if (result.success) {
          const updatedCoupons = coupons.map((coupon, index) =>
            index === editIndex ? result.coupon : coupon
          );
          setCoupons(updatedCoupons);
        }
      }
      setNewCoupon({
        Coupon_Name: '',
        Coupon_Value: '',
        Coupon_Type: 'percentage',
        Start_Date: '',
        End_Date: '',
        Active_Status: 'active'
      });
      setIsModalOpen(false);
      setIsEditing(false);
      setEditIndex(null);
      setEditCouponId(null);
    } catch (error) {
      console.error('Error saving coupon:', error.message);
    }
  };

  const handleOpenDeleteModal = (coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCouponToDelete(null);
  };

  const handleEditCoupon = (index, coupon) => {
    setEditIndex(index);
    setEditCouponId(coupon._id);
    setNewCoupon({
      Coupon_Name: coupon.Coupon_Name,
      Coupon_Value: coupon.Coupon_Value,
      Coupon_Type: coupon.Coupon_Type,
      Start_Date: coupon.Start_Date,
      End_Date: coupon.End_Date,
      Active_Status: coupon.Active_Status
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewCoupon({
      Coupon_Name: '',
      Coupon_Value: '',
      Coupon_Type: 'percentage',
      Start_Date: '',
      End_Date: '',
      Active_Status: 'active'
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Coupon Management</h1>

      <button onClick={openModal} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4 flex items-center">
        <FaPlus className="mr-2" />
        Add Coupon
      </button>

      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Coupon List</h2>

        <div className="overflow-x-auto">
          <ul>
            {coupons?.map((coupon, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded mb-4">
                <div><strong>Name:</strong> {coupon.Coupon_Name}</div>
                <div><strong>Value:</strong> {coupon.Coupon_Value}</div>
                <div><strong>Type:</strong> {coupon.Coupon_Type}</div>
                <div><strong>Start Date:</strong> {coupon.Start_Date}</div>
                <div><strong>End Date:</strong> {coupon.End_Date}</div>
                <div><strong>Status:</strong> {coupon.Active_Status === 'active' ? 'Active' : 'Inactive'}</div>
                <div className="flex justify-around mt-2">
                  <button onClick={() => handleEditCoupon(index, coupon)} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleOpenDeleteModal(coupon)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={isEditing ? handleSaveCoupon : handleAddCoupon}
        coupon={newCoupon}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteCoupon}
        coupon={couponToDelete}
      />
    </div>
  );
};

export default CouponPage;
