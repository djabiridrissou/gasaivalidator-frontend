import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { getCurentUser } from "../redux/features/auth";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [currentUser, setCurrentUser] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurentUser()).unwrap().then(res => {
      //console.log("res", res.user);
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match!");
    } else if (currentUser?.password !== oldPassword) {
      setError("Old password doesn't match!");
    }
    else {
      onSubmit(oldPassword, newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">

        <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
          <AiOutlineClose
            className="mt-[-10px] cursor-pointer text-red-500 float-right"
            onClick={() => {
              setOldPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setError('');
              onClose()
            }
            }
            size={24}
          />
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Current Password:</span>
              <input
                type="password"
                className="block w-full mt-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 text-black"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">New Password:</span>
              <input
                type="password"
                className="block w-full mt-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 text-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Confirm New Password:</span>
              <input
                type="password"
                className="block w-full mt-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Validate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
