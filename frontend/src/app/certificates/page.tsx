
'use client';

import { useEffect, useState } from 'react';
import { profileAPI, Certificate } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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
        <div className="text-xl">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t.certificates.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.certificates.subtitle}
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-xl text-gray-600 mb-4">{t.certificates.noCertificates}</p>
            <p className="text-gray-500">
              Add some certificates in Django admin to see them here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 transform hover:-translate-y-2">
                {certificate.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`http://127.0.0.1:8000${certificate.image}`}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{certificate.title}</h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">{certificate.issuer}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ {t.certificates.certified}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{t.certificates.issued}: {new Date(certificate.date_issued).toLocaleDateString()}</span>
                  </div>

                  {certificate.link && (
                    <a 
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {t.certificates.viewCertificate}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{certificates.length}</div>
              <div className="text-green-100">{t.certificates.stats.certificates}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">16</div>
              <div className="text-green-100">{t.certificates.stats.courses}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2+</div>
              <div className="text-green-100">{t.certificates.stats.years}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
