import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../assets/404.jpg'; // Resminizi doğru şekilde import ettiğinizden emin olun.

function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Kullanıcıyı önceki sayfaya yönlendirir
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="bg-opacity-20 bg-gray-900 p-8 rounded-xl shadow-xl backdrop-blur-xl w-full max-w-lg border-gray-800/80 border-2">
                {/* 404 Başlık */}
                <h2 className="text-4xl font-semibold text-center text-white mb-6">404 - Sayfa Bulunamadı</h2>

                {/* 404 Mesajı */}
                <div className="text-center text-white mb-6">
                    <p className="text-xl">Üzgünüz, aradığınız sayfa mevcut değil.</p>
                    <p className="mt-2 text-sm text-gray-400">Hata, yanlış bağlantıdan veya sayfanın kaldırılmasından kaynaklanmış olabilir.</p>
                </div>

                {/* 404 Resmi */}
                <div className="text-center mb-6">
                    <img src={NotFoundImage} alt="404 Not Found" className="w-full max-w-md rounded-lg shadow-md" />
                </div>

                {/* Geri Git Butonu */}
                <button
                    onClick={handleGoBack}
                    className="w-full py-4 text-lg font-semibold text-white bg-teal-500 rounded-md shadow-lg disabled:opacity-50"
                >
                    Geri Dön
                </button>

                {/* Ana Sayfaya Dön Linki */}
                <div className="mt-6 text-center">
                    <a href="/" className="text-teal-400 hover:underline">Ana Sayfaya Dön</a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
