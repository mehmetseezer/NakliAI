import React, { useState, useCallback } from 'react';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../public/logo.svg';

function Login() {
    const { onLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({ email: '', password: '', showPassword: false });
    const navigate = useNavigate();

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoading(true);

            if (formState.email && formState.password) {
                try {
                    await onLogin(formState.email, formState.password);
                    navigate('/', { replace: true });
                    toast.success('Giriş Başarılı');
                } catch (error) {
                    const errorMessage = {
                        'ERR_NETWORK': 'Lütfen bağlantınızı kontrol ediniz',
                        'ERR_CONNECTION_REFUSED': 'Sunucu bağlanmayı reddetti, daha sonra tekrar deneyiniz',
                        'ERR_BAD_REQUEST': 'Email ve parola uyuşmuyor',
                    }[error.code] || 'Bir hata meydana geldi';
                    toast.error(errorMessage);
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [formState, onLogin, navigate]
    );

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="bg-opacity-20 bg-gray-900 p-8 rounded-xl shadow-xl backdrop-blur-xl w-full max-w-sm border-gray-800/80 border-2">
                <div className="flex justify-center mb-6 gap-1">
                    <img src={logo} alt="Logo" className="w-12 h-12" />
                    <h2 className="text-4xl font-semibold text-white">akliAI</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative mb-6">
                        <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            className="w-full py-4 pl-12 pr-4 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 outline-none"
                            required
                        />
                    </div>
                    <div className="relative mb-6">
                        <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                        <input
                            type={formState.showPassword ? 'text' : 'password'}
                            placeholder="Şifre"
                            name="password"
                            value={formState.password}
                            onChange={handleInputChange}
                            className="w-full py-4 pl-12 pr-4 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 outline-none"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-0 p-4"
                            onClick={() => setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
                        >
                            {formState.showPassword ? (
                                <MdVisibilityOff className="text-white w-5 h-5 translate-y-0.5" />
                            ) : (
                                <MdVisibility className="text-white translate-y-0.5 w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full py-4 text-lg font-semibold text-white bg-teal-500 rounded-md shadow-lg disabled:opacity-50"
                    >
                        {isLoading ? 'Yükleniyor...' : 'Giriş Yap'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a href="/forgot-password" className="text-teal-400 hover:underline">Şifremi unuttum?</a>
                </div>
                <div className="mt-2 text-center">
                    <a href="/register" className="text-teal-400 hover:underline">Hesap oluştur</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
