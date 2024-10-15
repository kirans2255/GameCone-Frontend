/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { addCoupon, getCoupon, deleteCoupon, editCoupon, statusCoupon } from '../../services/admin/login';

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
  // const [activeStatusEditingIndex, setActiveStatusEditingIndex] = useState(null);

  const fetchCoupons = async () => {
    try {
      const result = await getCoupon();
      setCoupons(result.coupons);
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
        setIsEditing(false);
        setEditIndex(null);
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
        console.log('newCategory:', newCoupon);
        const result = await editCoupon(editCouponId, newCoupon.Coupon_Name, newCoupon.Coupon_Value, newCoupon.Coupon_Type, newCoupon.Start_Date, newCoupon.End_Date, newCoupon.Active_Status);
        fetchCoupons();
        console.log("brs", result);
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

  const handleStatusChange = async (couponId, coupon, newStatus) => {
    if (!couponId) {
      console.error("Coupon ID is undefined");
      return;
    }

    try {
      const updatedCoupon = {
        Coupon_Name: coupon.Coupon_Name,
        Coupon_Value: coupon.Coupon_Value,
        Coupon_Type: coupon.Coupon_Type,
        Start_Date: coupon.Start_Date,
        End_Date: coupon.End_Date,
        Active_Status: newStatus
      };

      const result = await statusCoupon(couponId, updatedCoupon);

      if (result.success) {
        const updatedCoupons = coupons.map(c =>
          c._id === couponId ? { ...c, Active_Status: newStatus } : c
        );
        setCoupons(updatedCoupons);
      }
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };


  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Coupon Management</h1>
      <button
        onClick={openModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
      >
        <FaPlus className="mr-2" /> Add Coupon
      </button>

      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Value</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon._id}>
              <td className="border px-4 py-2">{coupon.Coupon_Name}</td>
              <td className="border px-4 py-2">{coupon.Coupon_Value}</td>
              <td className="border px-4 py-2">{coupon.Coupon_Type}</td>
              <td className="border px-4 py-2">{coupon.Start_Date}</td>
              <td className="border px-4 py-2">{coupon.End_Date}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleStatusChange(coupon._id, coupon, coupon.Active_Status === "active" ? "inactive" : "active")}
                  className={`py-2 px-4 rounded ${coupon.Active_Status === "active" ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                >
                  {coupon.Active_Status === "active" ? 'Active' : 'InActive'}
                </button>

              </td>
              <td className="border px-4 py-2 flex items-center space-x-4">
                <button
                  onClick={() => handleEditCoupon(index, coupon)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(coupon)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={isEditing ? handleSaveCoupon : handleAddCoupon}
        coupon={newCoupon}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
      />

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
