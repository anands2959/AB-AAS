'use client';

import { useState, useEffect } from 'react';
import NgoCard from './components/NgoCard';
import { fetchNgoData, NgoData } from './lib/fetchData';

export default function Home() {
  const [ngoData, setNgoData] = useState<NgoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchNgoData(); // Remove the URL parameter
        setNgoData(data);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredData = ngoData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phoneNumber.includes(searchTerm) ||
    item.disabilityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1EFCE] flex items-center justify-center">
        <div className="text-center p-8 bg-white less-rounded shadow-lg border-2 border-[#CCB256]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border-4 border-[#F1EFCE] border-t-[#CCB256] rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-[#C03825] mb-2">Loading Beneficiaries</h2>
          <p className="text-gray-700">Fetching beneficiary data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F1EFCE] flex items-center justify-center p-2">
        <div className="text-center bg-white less-rounded-lg shadow-xl border-2 border-[#C03825] p-6 max-w-md">
          <div className="w-14 h-14 bg-[#F1EFCE] rounded-md flex items-center justify-center mx-auto mb-3 border-2 border-[#CCB256]">
            <svg className="w-7 h-7 text-[#C03825]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#C03825] mb-1 handwritten">Oh no! Something went wrong</h2>
          <p className="text-gray-700 mb-3 text-sm">We couldn't load the beneficiary data.</p>
          <p className="text-xs text-gray-600 bg-[#F1EFCE] p-2 less-rounded">Please check your .env file and ensure the Excel URL is correct.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1EFCE] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-[#CCB256] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 py-1 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-3 md:mb-0 text-center md:text-left">
              
              <div className="flex-shrink-0 mr-3">
                <img
                  src="/logo.png"
                  alt="AB AAS Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div className='flex flex-col items-center'>
                <h1 className="text-xl font-bold text-[#C03825] handwritten">|| AB AAS ||</h1>
                <p className="text-lg font-semibold text-[#C03825] mt-0.5">अखिल भारतीय अष्टावक्र अद्वैत संस्थान</p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-[#CCB256]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="focus:ring-[#CCB256] focus:border-[#CCB256] block w-full pl-8 pr-3 py-2 text-xs border-2 border-[#CCB256] less-rounded"
                  placeholder="Search beneficiaries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 lg:px-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-white overflow-hidden shadow less-rounded border-2 border-[#CCB256]">
              <div className="px-3 py-2 sm:p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#F1EFCE] rounded p-2 border-2 border-[#CCB256]">
                    <svg className="h-5 w-5 text-[#C03825]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <dl>
                      <dt className="text-xs font-medium text-gray-600">Total Beneficiaries</dt>
                      <dd className="flex items-baseline">
                        <div className="text-lg font-bold text-[#C03825]">{ngoData.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow less-rounded border-2 border-[#CCB256]">
              <div className="px-3 py-2 sm:p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#F1EFCE] rounded p-2 border-2 border-[#CCB256]">
                    <svg className="h-5 w-5 text-[#C03825]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <dl>
                      <dt className="text-xs font-medium text-gray-600">Active Cases</dt>
                      <dd className="flex items-baseline">
                        <div className="text-lg font-bold text-[#C03825]">{Math.floor(ngoData.length * 0.85)}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow less-rounded border-2 border-[#CCB256]">
              <div className="px-3 py-2 sm:p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#F1EFCE] rounded p-2 border-2 border-[#CCB256]">
                    <svg className="h-5 w-5 text-[#C03825]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <dl>
                      <dt className="text-xs font-medium text-gray-600">Pending Reviews</dt>
                      <dd className="flex items-baseline">
                        <div className="text-lg font-bold text-[#C03825]">{Math.floor(ngoData.length * 0.15)}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow less-rounded border-2 border-[#CCB256]">
              <div className="px-3 py-2 sm:p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#F1EFCE] rounded p-2 border-2 border-[#CCB256]">
                    <svg className="h-5 w-5 text-[#C03825]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <dl>
                      <dt className="text-xs font-medium text-gray-600">Support Types</dt>
                      <dd className="flex items-baseline">
                        <div className="text-lg font-bold text-[#C03825]">12</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficiaries List */}
          {filteredData.length === 0 ? (
            <div className="text-center py-8 bg-white less-rounded shadow border-2 border-dashed border-[#CCB256]">
              <svg className="mx-auto h-10 w-10 text-[#CCB256]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-1 text-lg font-bold text-[#C03825] handwritten">No beneficiaries found</h3>
              <p className="mt-1 text-gray-600 text-sm">Try adjusting your search or check back later.</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#C03825] handwritten">
                  Our Beneficiaries <span className="text-gray-700 not-handwritten text-sm">({filteredData.length} people)</span>
                </h2>
                <div className="text-xs text-gray-600 bg-white px-2 py-1 less-rounded border-2 border-[#CCB256]">
                  Showing {filteredData.length} beneficiaries
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((data, index) => (
                  <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                    <NgoCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t-2 border-[#CCB256] mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="text-center text-xs text-gray-600">
            <p>© {new Date().getFullYear()} अखिल भारतीय अष्टावक्र अद्वैत संस्थान (AB AAS). All rights reserved.</p>
            <div className="mt-1">
              <a
                href="/privacy-policy"
                className="text-[#C03825] hover:text-[#CCB256] hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}