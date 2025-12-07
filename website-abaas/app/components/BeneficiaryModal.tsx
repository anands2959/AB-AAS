'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NgoData } from '../lib/fetchData';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface BeneficiaryModalProps {
  data: NgoData;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BeneficiaryModal({ data, isOpen, onClose, onUpdate }: BeneficiaryModalProps) {
  const [updating, setUpdating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const updateBenefitStatus = async (benefitIndex: number, newStatus: string) => {
    if (!data.id) return;
    
    setUpdating(true);
    try {
      const updatedBenefits = [...(data.appliedBenefits || [])];
      updatedBenefits[benefitIndex] = {
        ...updatedBenefits[benefitIndex],
        status: newStatus
      };

      const docRef = doc(db, 'users', data.id);
      await updateDoc(docRef, {
        appliedBenefits: updatedBenefits
      });

      alert('Status updated successfully!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'rejected') return 'bg-red-100 text-red-800 border-red-300';
    if (status === 'processing') return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-white/30"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#F1EFCE] border-b-2 border-[#CCB256] p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#C03825] handwritten">Beneficiary Details</h2>
          <button
            onClick={onClose}
            className="text-[#C03825] hover:text-[#a02f1f] text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="border-2 border-[#CCB256] rounded-lg p-4 bg-[#F1EFCE]">
            <h3 className="text-xl font-bold text-[#C03825] handwritten mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-[#C03825]">Full Name</p>
                <p className="text-sm text-gray-800 font-semibold">{data.fullName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#C03825]">Phone Number</p>
                <p className="text-sm text-gray-800">{data.phoneNumber}</p>
              </div>
              {data.alternateMobile && (
                <div>
                  <p className="text-xs font-medium text-[#C03825]">Alternate Mobile</p>
                  <p className="text-sm text-gray-800">{data.alternateMobile}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-[#C03825]">Date of Birth</p>
                <p className="text-sm text-gray-800">{data.dob}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#C03825]">Gender</p>
                <p className="text-sm text-gray-800">{data.gender}</p>
              </div>
              {data.aadharNumber && (
                <div>
                  <p className="text-xs font-medium text-[#C03825]">Aadhar Number</p>
                  <p className="text-sm text-gray-800">{data.aadharNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="border-2 border-[#CCB256] rounded-lg p-4 bg-[#F1EFCE]">
            <h3 className="text-xl font-bold text-[#C03825] handwritten mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <p className="text-xs font-medium text-[#C03825]">Address</p>
                <p className="text-sm text-gray-800">{data.address}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#C03825]">District</p>
                <p className="text-sm text-gray-800">{data.district}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#C03825]">State</p>
                <p className="text-sm text-gray-800">{data.state}</p>
              </div>
              {data.pinCode && (
                <div>
                  <p className="text-xs font-medium text-[#C03825]">Pin Code</p>
                  <p className="text-sm text-gray-800">{data.pinCode}</p>
                </div>
              )}
            </div>
          </div>

          {/* Disability Information */}
          <div className="border-2 border-[#CCB256] rounded-lg p-4 bg-[#F1EFCE]">
            <h3 className="text-xl font-bold text-[#C03825] handwritten mb-4">Disability Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-[#C03825]">Disability Type</p>
                <p className="text-sm text-gray-800 capitalize">{data.disabilityType}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#C03825]">Disability Percentage</p>
                <p className="text-sm text-gray-800">{data.disabilityPercentage}%</p>
              </div>
              {data.monthlyIncome && (
                <div>
                  <p className="text-xs font-medium text-[#C03825]">Monthly Income</p>
                  <p className="text-sm text-gray-800">₹{data.monthlyIncome}</p>
                </div>
              )}
            </div>
          </div>

          {/* Applied Benefits */}
          {data.appliedBenefits && data.appliedBenefits.length > 0 && (
            <div className="border-2 border-[#CCB256] rounded-lg p-4 bg-[#F1EFCE]">
              <h3 className="text-xl font-bold text-[#C03825] handwritten mb-4">
                Applied Benefits ({data.appliedBenefits.length})
              </h3>
              <div className="space-y-4">
                {data.appliedBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-2 border-[#CCB256]">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-[#C03825] mb-1">{benefit.benefitTitle}</h4>
                        <p className="text-xs text-gray-600">Application ID: {benefit.applicationId}</p>
                        <p className="text-xs text-gray-600">
                          Applied: {new Date(benefit.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-md text-sm font-medium border-2 capitalize ${getStatusColor(benefit.status)}`}>
                        {benefit.status}
                      </span>
                    </div>
                    
                    {/* Status Change Buttons */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-[#CCB256]">
                      <p className="text-xs font-medium text-[#C03825] mr-2">Change Status:</p>
                      <button
                        onClick={() => updateBenefitStatus(index, 'pending')}
                        disabled={updating || benefit.status === 'pending'}
                        className="px-3 py-1 text-xs rounded bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateBenefitStatus(index, 'processing')}
                        disabled={updating || benefit.status === 'processing'}
                        className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Processing
                      </button>
                      <button
                        onClick={() => updateBenefitStatus(index, 'approved')}
                        disabled={updating || benefit.status === 'approved'}
                        className="px-3 py-1 text-xs rounded bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => updateBenefitStatus(index, 'rejected')}
                        disabled={updating || benefit.status === 'rejected'}
                        className="px-3 py-1 text-xs rounded bg-red-100 text-red-800 border border-red-300 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Rejected
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#F1EFCE] border-t-2 border-[#CCB256] p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#C03825] text-white rounded hover:bg-[#a02f1f] font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
