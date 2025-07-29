
// src/app/certificates/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { profileAPI, Certificate } from '@/lib/api';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await profileAPI.getCertificates();
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Certificates & Education</h1>
          <p className="text-xl text-gray-600">
            My professional certifications and educational achievements
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No certificates found. Add some certificates in Django admin!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-green-500">
                {certificate.image && (
                  <img 
                    src={`http://127.0.0.1:8000${certificate.image}`}
                    alt={certificate.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{certificate.title}</h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">{certificate.issuer}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Certified
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Issued: {new Date(certificate.date_issued).toLocaleDateString()}</span>
                  </div>

                  {certificate.link && (
                    <a 
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{certificates.length}</div>
              <div className="text-blue-100">Certificates Earned</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">16</div>
              <div className="text-blue-100">Courses Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2+</div>
              <div className="text-blue-100">Years Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
