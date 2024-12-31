import React from 'react';
import logo from '../../public/logo.svg'; // Logo importu
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // react-icons'dan sosyal medya ikonları

const Footer = () => {
    return (
        <footer className="bg-transparent py-8 text-center text-gray-300">
            <hr className="border-t-2 border-neutral-800 my-8" /> {/* Yatay çizgi */}

            {/* Logo ve Metin */}
            <div className="flex justify-center mb-6 gap-1 items-center">
                <img src={logo} alt="NakliAI Logo" className="w-12 h-12" />
                <h2 className="text-4xl font-semibold text-white">NakliAI</h2>
            </div>

            {/* Sosyal Medya Bağlantıları */}
            <div className="mt-4 flex justify-center space-x-6">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                >
                    <FaFacebookF size={20} /> {/* Facebook İkonu */}
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                >
                    <FaTwitter size={20} /> {/* Twitter İkonu */}
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                >
                    <FaInstagram size={20} /> {/* Instagram İkonu */}
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                >
                    <FaLinkedin size={20} /> {/* LinkedIn İkonu */}
                </a>
            </div>

            {/* Footer Linkler */}
            <div className="mt-4 flex justify-center space-x-4 flex-wrap">
                <a href="/privacy-policy" className="text-gray-400 hover:text-white">
                    Gizlilik Politikası
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white">
                    Kullanım Şartları
                </a>
                <a href="/contact" className="text-gray-400 hover:text-white">
                    İletişim
                </a>
            </div>

            {/* Ekstra Bilgi */}
            <div className="mt-6 text-sm">
                <p>
                    NakliAI, lojistik ve taşımacılık sektöründe yapay zeka destekli çözümler sunan bir platformdur.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
