'use client';

import { useState } from 'react';
import { NgoData } from '../lib/fetchData';
import BeneficiaryModal from './BeneficiaryModal';

interface NgoCardProps {
  data: NgoData;
  onUpdate: () => void;
}

export default function NgoCard({ data, onUpdate }: NgoCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to get initial character for avatar
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };

  // Function to determine disability severity color
  const getDisabilitySeverityColor = (percentage: string) => {
    const percent = parseInt(percentage) || 0;
    if (percent >= 70) return 'bg-[#F1EFCE] text-[#C03825] border-[#C03825]';
    if (percent >= 40) return 'bg-[#F1EFCE] text-[#CCB256] border-[#CCB256]';
    return 'bg-[#F1EFCE] text-[#5D5D5D] border-[#5D5D5D]';
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    if (status === 'approved') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'rejected') return 'bg-red-100 text-red-800 border-red-300';
    if (status === 'processing') return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-300'; // pending
  };

  // Function to get status display text
  const getStatusText = (status: string) => {
    if (status === 'approved') return 'Approved';
    if (status === 'rejected') return 'Rejected';
    if (status === 'processing') return 'Processing';
    return 'Pending';
  };

  return (
    <div className="card-hover bg-white less-rounded shadow-md overflow-hidden border-2 border-[#CCB256] transition-all duration-300">
      {/* Card Header with personal touch */}
      <div className="p-3 bg-[#F1EFCE]">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#CCB256] flex items-center justify-center border-2 border-[#C03825]">
              <span className="text-[#C03825] font-bold text-lg handwritten">{getInitials(data.fullName)}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-[#C03825] handwritten truncate max-w-[140px]">{data.fullName || 'Unnamed Beneficiary'}</h3>
              <p className="text-xs text-gray-700 flex items-center mt-0.5">
                <svg className="flex-shrink-0 mr-1 h-3 w-3 text-[#CCB256]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                {data.district}, {data.state}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-3 py-1 border border-[#C03825] text-xs font-medium rounded-md text-[#C03825] bg-[#F1EFCE] hover:bg-[#E5DCC8] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#CCB256] transition-colors handwritten"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3">
        {!showDetails ? (
          // Summary View with warm, human touch
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                <p className="text-xs font-medium text-[#C03825] uppercase tracking-wide">Phone</p>
                <p className="mt-0.5 text-xs text-gray-800 flex items-center">
                  <svg className="flex-shrink-0 mr-1 h-3 w-3 text-[#CCB256]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  {data.phoneNumber || 'N/A'}
                </p>
              </div>
              <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                <p className="text-xs font-medium text-[#C03825] uppercase tracking-wide">Gender</p>
                <p className="mt-0.5 text-xs text-gray-800 flex items-center">
                  <svg className="flex-shrink-0 mr-1 h-3 w-3 text-[#CCB256]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                  {data.gender || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border-2 ${getDisabilitySeverityColor(data.disabilityPercentage)}`}>
                <svg className="-ml-0.5 mr-1 h-1.5 w-1.5" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3"></circle>
                </svg>
                {data.disabilityType || 'No Disability'} ({data.disabilityPercentage}%)
              </span>
              {data.appliedBenefits && data.appliedBenefits.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border-2 bg-blue-100 text-blue-800 border-blue-300">
                  <svg className="-ml-0.5 mr-1 h-1.5 w-1.5" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3"></circle>
                  </svg>
                  {data.appliedBenefits.length} Benefits Applied
                </span>
              )}
            </div>
          </div>
        ) : (
          // Detailed View with personal, caring touch
          <div className="space-y-3 animate-fadeIn">
            <div className="border-t-2 border-[#CCB256] pt-3">
              <h4 className="text-base font-bold text-[#C03825] handwritten mb-2">Personal Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Phone Number</dt>
                  <dd className="text-xs text-gray-800 text-right">{data.phoneNumber || 'N/A'}</dd>
                </div>
                {data.alternateMobile && (
                  <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                    <dt className="text-xs font-medium text-[#C03825]">Alternate Mobile</dt>
                    <dd className="text-xs text-gray-800 text-right">{data.alternateMobile}</dd>
                  </div>
                )}
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Date of Birth</dt>
                  <dd className="text-xs text-gray-800 text-right">{data.dob || 'N/A'}</dd>
                </div>
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Gender</dt>
                  <dd className="text-xs text-gray-800 text-right">{data.gender || 'N/A'}</dd>
                </div>
                {data.aadharNumber && (
                  <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                    <dt className="text-xs font-medium text-[#C03825]">Aadhar Number</dt>
                    <dd className="text-xs text-gray-800 text-right">{data.aadharNumber}</dd>
                  </div>
                )}
                <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825] mb-0.5">Address</dt>
                  <dd className="text-xs text-gray-800">{data.address || 'N/A'}</dd>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                    <dt className="text-xs font-medium text-[#C03825]">District</dt>
                    <dd className="text-xs text-gray-800">{data.district || 'N/A'}</dd>
                  </div>
                  <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                    <dt className="text-xs font-medium text-[#C03825]">State</dt>
                    <dd className="text-xs text-gray-800">{data.state || 'N/A'}</dd>
                  </div>
                </div>
                {data.pinCode && (
                  <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                    <dt className="text-xs font-medium text-[#C03825]">Pin Code</dt>
                    <dd className="text-xs text-gray-800 text-right">{data.pinCode}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="border-t-2 border-[#CCB256] pt-3">
              <h4 className="text-base font-bold text-[#C03825] handwritten mb-2">Disability Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Type</dt>
                  <dd className="text-xs text-gray-800 text-right capitalize">{data.disabilityType || 'None specified'}</dd>
                </div>
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Percentage</dt>
                  <dd className="text-xs text-gray-800">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium border-2 ${getDisabilitySeverityColor(data.disabilityPercentage)}`}>
                      {data.disabilityPercentage}%
                    </span>
                  </dd>
                </div>
                {data.monthlyIncome && (
                  <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                    <dt className="text-xs font-medium text-[#C03825]">Monthly Income</dt>
                    <dd className="text-xs text-gray-800 text-right">₹{data.monthlyIncome}</dd>
                  </div>
                )}
              </dl>
            </div>

            {data.appliedBenefits && data.appliedBenefits.length > 0 && (
              <div className="border-t-2 border-[#CCB256] pt-3">
                <h4 className="text-base font-bold text-[#C03825] handwritten mb-2">Applied Benefits ({data.appliedBenefits.length})</h4>
                <div className="space-y-2">
                  {data.appliedBenefits.map((benefit, index) => (
                    <div key={index} className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-xs font-bold text-[#C03825]">{benefit.benefitTitle}</h5>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium border-2 capitalize ${getStatusColor(benefit.status)}`}>
                          {getStatusText(benefit.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Application ID: {benefit.applicationId}</p>
                      <p className="text-xs text-gray-600">Applied: {new Date(benefit.appliedAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      
      {/* Modal */}
      <BeneficiaryModal
        data={data}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
}