'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#F1EFCE]">
            {/* Header */}
            <header className="bg-white shadow-sm border-b-2 border-[#CCB256] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <div className="flex-shrink-0 mr-3">
                                <img
                                    src="/logo.png"
                                    alt="AB AAS Logo"
                                    className="h-10 w-10 object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-[#C03825] handwritten">|| AB AAS ||</h1>
                                <p className="text-sm font-semibold text-[#C03825]">अखिल भारतीय अष्टावक्र अद्वैत संस्थान</p>
                            </div>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center px-3 py-1 border border-[#C03825] text-sm font-medium rounded-md text-[#C03825] bg-[#F1EFCE] hover:bg-[#E5DCC8] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#CCB256] transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white less-rounded shadow-md border-2 border-[#CCB256] overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <h1 className="text-2xl font-bold text-[#C03825] handwritten mb-6 text-center">Privacy Policy</h1>

                        <div className="prose max-w-none">
                            <p className="text-gray-700 mb-6">
                                This Privacy Policy describes how AB AAS ("we", "our", or "us") collects, uses, and protects your personal information when you use our application and services.
                            </p>

                            <h2 className="text-xl font-semibold text-[#CCB256] mt-8 mb-4">Information We Collect</h2>

                            <h3 className="text-lg font-medium text-[#C03825] mt-6 mb-2">Beneficiary Information</h3>
                            <p className="text-gray-700 mb-4">
                                We collect information about beneficiaries to provide our support services, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                                <li>Personal identification information (name, date of birth)</li>
                                <li>Contact details (phone number, address)</li>
                                <li>Disability information (type and percentage)</li>
                                <li>Family and marital status</li>
                                <li>Additional comments and notes related to support needs</li>
                            </ul>

                            <h3 className="text-lg font-medium text-[#C03825] mt-6 mb-2">User Information</h3>
                            <p className="text-gray-700 mb-4">
                                For users accessing our application, we may collect:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                                <li>Contact information for communication purposes</li>
                                <li>Usage data to improve our services</li>
                                <li>Device information for technical support</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-[#CCB256] mt-8 mb-4">How We Use Your Information</h2>

                            <h3 className="text-lg font-medium text-[#C03825] mt-6 mb-2">Beneficiary Support</h3>
                            <p className="text-gray-700 mb-4">
                                We use the collected information to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                                <li>Provide and manage beneficiary support services</li>
                                <li>Coordinate care and assistance programs</li>
                                <li>Maintain accurate records for ongoing support</li>
                                <li>Ensure appropriate resources are allocated</li>
                            </ul>

                            <h3 className="text-lg font-medium text-[#C03825] mt-6 mb-2">Communication</h3>
                            <p className="text-gray-700 mb-4">
                                Your information is used to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                                <li>Contact beneficiaries regarding their support services</li>
                                <li>Send important updates and notifications</li>
                                <li>Respond to inquiries and requests</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-[#CCB256] mt-8 mb-4">Data Protection</h2>
                            <p className="text-gray-700 mb-4">
                                We are committed to protecting your personal information:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                                <li>All data is stored securely with appropriate safeguards</li>
                                <li>Access to information is limited to authorized personnel only</li>
                                <li>We do not sell or share your information with third parties</li>
                                <li>Data is retained only as long as necessary for our services</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-[#CCB256] mt-8 mb-4">Your Rights</h2>
                            <p className="text-gray-700 mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                                <li>Access your personal information</li>
                                <li>Request corrections to inaccurate data</li>
                                <li>Request deletion of your information</li>
                                <li>Withdraw consent for data processing</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-[#CCB256] mt-8 mb-4">Contact Us</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className=" p-2 less-rounded border-2 border-[#CCB256] mb-6">
                                <p className="text-gray-800">
                                    <span className="font-medium">Email:</span> ashtavakramuni@gmail.com
                                </p>
                                <p className="text-gray-800 mt-2">
                                    <span className="font-medium">Phone:</span> +91-80041 25330
                                </p>
                                <p className="text-gray-800 mt-2">
                                    <span className="font-medium">Address:</span> Om internet cafe, Renukoot, Uttar Pradesh 231217
                                </p>
                            </div>

                            <div className="border-t-2 border-[#CCB256] pt-6 mt-8">
                                <p className="text-sm text-gray-600">
                                    This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t-2 border-[#CCB256] mt-8">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} अखिल भारतीय अष्टावक्र अद्वैत संस्थान (AB AAS). All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}