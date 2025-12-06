'use client';

import { useState } from 'react';
import { NgoData } from '../lib/fetchData';

interface NgoCardProps {
  data: NgoData;
}

export default function NgoCard({ data }: NgoCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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

  // Function to determine marital status color
  const getMaritalStatusColor = (status: string) => {
    if (status.toLowerCase().includes('married')) return 'bg-[#F1EFCE] text-[#C03825] border-[#C03825]';
    if (status.toLowerCase().includes('single')) return 'bg-[#F1EFCE] text-[#CCB256] border-[#CCB256]';
    return 'bg-[#F1EFCE] text-[#5D5D5D] border-[#5D5D5D]';
  };

  return (
    <div className="card-hover bg-white less-rounded shadow-md overflow-hidden border-2 border-[#CCB256] transition-all duration-300">
      {/* Card Header with personal touch */}
      <div className="p-3 bg-[#F1EFCE]">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-md bg-[#CCB256] flex items-center justify-center border-2 border-[#C03825]">
              <span className="text-[#C03825] font-bold text-lg handwritten">{getInitials(data.name)}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-[#C03825] handwritten truncate max-w-[140px]">{data.name || 'Unnamed Beneficiary'}</h3>
              <p className="text-xs text-gray-700 flex items-center mt-0.5">
                <svg className="flex-shrink-0 mr-1 h-3 w-3 text-[#CCB256]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                {data.address ? data.address.split(',')[0] : 'Location N/A'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center px-3 py-1 border border-[#C03825] text-xs font-medium rounded-md text-[#C03825] bg-[#F1EFCE] hover:bg-[#E5DCC8] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#CCB256] transition-colors handwritten"
          >
            {showDetails ? 'Show Less' : 'View Details'}
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
                <p className="text-xs font-medium text-[#C03825] uppercase tracking-wide">D.O.B</p>
                <p className="mt-0.5 text-xs text-gray-800 flex items-center">
                  <svg className="flex-shrink-0 mr-1 h-3 w-3 text-[#CCB256]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  {data.dob || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border-2 ${getDisabilitySeverityColor(data.disabilityPercentage)}`}>
                <svg className="-ml-0.5 mr-1 h-1.5 w-1.5" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3"></circle>
                </svg>
                {data.disabilityType || 'No Disability'} {data.disabilityPercentage ? `(${data.disabilityPercentage})` : ''}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border-2 ${getMaritalStatusColor(data.maritalStatus)}`}>
                <svg className="-ml-0.5 mr-1 h-1.5 w-1.5" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3"></circle>
                </svg>
                {data.maritalStatus || 'Status N/A'}
              </span>
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
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Date of Birth</dt>
                  <dd className="text-xs text-gray-800 text-right">{data.dob || 'N/A'}</dd>
                </div>
                <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825] mb-0.5">Address</dt>
                  <dd className="text-xs text-gray-800">{data.address || 'N/A'}</dd>
                </div>
              </dl>
            </div>

            <div className="border-t-2 border-[#CCB256] pt-3">
              <h4 className="text-base font-bold text-[#C03825] handwritten mb-2">Disability Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Type</dt>
                  <dd className="text-xs text-gray-800 text-right">{data.disabilityType || 'None specified'}</dd>
                </div>
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Percentage</dt>
                  <dd className="text-xs text-gray-800">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium border-2 ${getDisabilitySeverityColor(data.disabilityPercentage)}`}>
                      {data.disabilityPercentage || 'N/A'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t-2 border-[#CCB256] pt-3">
              <h4 className="text-base font-bold text-[#C03825] handwritten mb-2">Additional Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between items-start bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825]">Marital Status</dt>
                  <dd className="text-xs text-gray-800">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium border-2 ${getMaritalStatusColor(data.maritalStatus)}`}>
                      {data.maritalStatus || 'N/A'}
                    </span>
                  </dd>
                </div>
                <div className="bg-[#F1EFCE] p-2 less-rounded border-2 border-[#CCB256]">
                  <dt className="text-xs font-medium text-[#C03825] mb-0.5">Comments</dt>
                  <dd className="text-xs text-gray-800 bg-white p-2 less-rounded-sm border-2 border-[#E5DCC8]">
                    {data.comments || 'No additional comments provided.'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}