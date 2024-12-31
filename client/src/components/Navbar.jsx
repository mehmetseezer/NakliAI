import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../public/logo.svg';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { auth, onLogout } = useAuth();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await onLogout();
            toast.success('Başarıyla çıkış yapıldı.');
        } catch (error) {
            toast.error('Çıkış yaparken bir hata meydana geldi!');
        }
    };

    return (
        <header className="sticky top-0 left-0 z-50 backdrop-blur-md bg-black/40 shadow-lg border-b border-black/30">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo - Wrapped in Link to go to Home */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Brand" className="w-10 h-10" />
                        <h1 className="text-2xl font-semibold text-white">NakliAI</h1>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white z-50 text-2xl focus:outline-none"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Web Navigation Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            className="w-full lg:w-96 py-2 px-10 text-sm rounded-full border border-gray-700 bg-transparent backdrop-blur-md text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Ara..."
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        {auth?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition"
                                >
                                    <img
                                        src={auth.user.profilePhoto || 'https://picsum.photos/seed/picsum/40'}
                                        alt={auth.user.name}
                                        className="w-10 h-10 rounded-full border border-white/30"
                                    />
                                    <span className="hidden sm:block font-medium">{auth.user.name}</span>
                                    <FaChevronDown
                                        className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu for Desktop */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-black/60 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border border-gray-700">
                                        <Link
                                            to="/tools"
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-gray-300"
                                        >
                                            Araçlarım
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-gray-300"
                                        >
                                            Profilim
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-gray-300"
                                        >
                                            Çıkış Yap
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-full text-gray-100 bg-gray-800 hover:bg-gray-900 text-sm transition"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-full text-gray-100 bg-gray-800 hover:bg-gray-900 text-sm transition"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden fixed inset-0 h-screen w-full bg-black/70 backdrop-blur-md flex flex-col items-center justify-start gap-8 px-6 py-8 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {/* Mobile User Section */}
                    <div className="flex flex-col items-center space-y-4">
                        {auth?.user ? (
                            <>
                                <div className="relative flex flex-col items-center space-y-2">
                                    <img
                                        src={auth.user.profilePhoto || 'https://picsum.photos/seed/picsum/40'}
                                        alt={auth.user.name}
                                        className="w-16 h-16 rounded-full border-4 border-white"
                                    />
                                    <span className="text-white font-medium">{auth.user.name}</span>
                                </div>

                                {/* Direct Links for Mobile */}
                                <div className="w-full flex flex-col items-center space-y-4">
                                    <Link
                                        to="/tools"
                                        className="block w-full px-4 py-3 text-sm text-white bg-gray-800 hover:bg-gray-900 text-center rounded-lg"
                                    >
                                        Araçlarım
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="block w-full px-4 py-3 text-sm text-white bg-gray-800 hover:bg-gray-900 text-center rounded-lg"
                                    >
                                        Profilim
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-3 text-sm text-white bg-gray-800 hover:bg-gray-900 text-center rounded-lg"
                                    >
                                        Çıkış Yap
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block w-full px-4 py-3 text-sm text-white bg-gray-800 hover:bg-gray-900 text-center rounded-lg"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full px-4 py-3 text-sm text-white bg-gray-800 hover:bg-gray-900 text-center rounded-lg"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
