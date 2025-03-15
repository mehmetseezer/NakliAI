import React, { useState, useEffect, useCallback } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [otp, setOtp] = useState('');
    const { onRegister } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [isPersonalInfoFormVisible, setIsPersonalInfoFormVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formState, setFormState] = useState({
        otp: '',
        phoneNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const isDevelopment = 'development';
    const devOtpCode = '290629';

    useEffect(() => {
        if (!isDevelopment) {
            // Sadece production modunda Recaptcha etkinleştir
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'normal',
                callback: () => { },
                'expired-callback': () => { },
            });
        }
    }, [auth, isDevelopment]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        console.log(`${name} => ${value}`)
        setFormState((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSendOtp = async () => {
        if (isDevelopment) {
            // Geliştirme modunda doğrudan OTP gönderilmiş gibi davran
            setOtpSent(true);
            setConfirmationResult(true);
            toast.success(`Geliştirme modunda, OTP: ${devOtpCode}`);
        } else {
            try {
                const formattedPhoneNumber = `+${formState.phoneNumber.replace(/\D/g, '')}`;
                const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
                setConfirmationResult(confirmation);
                setOtpSent(true);
                toast.success('OTP başarıyla gönderildi');
            } catch (error) {
                console.error(error);
                const errorMessages = {
                    'auth/invalid-phone-number': 'Geçersiz telefon numarası',
                    'auth/missing-phone-number': 'Telefon numarası eksik',
                    'auth/too-many-requests': 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin',
                    'auth/recaptcha-error': 'Recaptcha doğrulama hatası. Lütfen tekrar deneyin',
                };
                toast.error(errorMessages[error.code] || 'Bir hata meydana geldi');
            }
        }
    };

    const handleOTPSubmit = async () => {
        if (isDevelopment) {
            if (otp === devOtpCode) {
                setOtp('');
                setIsPersonalInfoFormVisible(true);
            } else {
                toast.error('Geçersiz OTP kodu');
            }
        } else {
            try {
                await confirmationResult.confirm(otp);
                setOtp('');
                setIsPersonalInfoFormVisible(true);
            } catch (error) {
                console.error(error);
                const errorMessages = {
                    'auth/invalid-verification-code': 'Geçersiz OTP kodu',
                    'auth/expired-credential': 'Kod süresi dolmuş. Lütfen tekrar gönderin',
                };
                toast.error(errorMessages[error.code] || 'Bir hata meydana geldi');
            }
        }
    };

    const handleRegister = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoading(true);

            if (formState.password !== formState.confirmPassword) {
                toast.error('Parolalar uyuşmuyor');
                setIsLoading(false);
                return;
            }

            if (formState.name && formState.email && formState.password && formState.phoneNumber) {
                try {
                    console.log(formState);
                    await onRegister(formState.name, formState.email, formState.password, formState.phoneNumber);
                    navigate('/', { replace: true });
                    toast.success('Kayıt Başarılı! Yönlendiriliyorsunuz...');
                } catch (error) {
                    console.error(error);
                    toast.error('Kayıt sırasında bir hata meydana geldi');
                } finally {
                    setIsLoading(false);
                }
            } else {
                toast.error('Lütfen tüm alanları doldurunuz.');
                setIsLoading(false);
            }
        },
        [formState, onRegister, navigate]
    );

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
            <div className="bg-opacity-20 bg-gray-900 p-8 rounded-xl shadow-xl backdrop-blur-xl w-full max-w-md border-gray-800/80 border-2">
                <div className="flex justify-center mb-6 gap-1">
                    <h2 className="text-4xl font-semibold text-white">Hesap Oluştur</h2>
                </div>

                {!otpSent && (
                    <div className="space-y-6">
                        {!isDevelopment && <div id="recaptcha-container" className="w-full mb-4"></div>}
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formState.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Telefon Numarası (Ülke Kodu dahil)"
                            className="w-full py-4 px-4 bg-transparent border rounded-md text-white"
                        />
                        <button onClick={handleSendOtp} className="w-full py-4 bg-teal-500 text-white rounded-md">
                            OTP Gönder
                        </button>
                    </div>
                )}

                {otpSent && !isPersonalInfoFormVisible && (
                    <div className="space-y-6">
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="OTP Kodu"
                            className="w-full py-4 px-4 bg-transparent border rounded-md text-white"
                        />
                        <button onClick={handleOTPSubmit} className="w-full py-4 bg-teal-500 text-white rounded-md">
                            OTP'yi Gönder
                        </button>
                    </div>
                )}

                {isPersonalInfoFormVisible && (
                    <div className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder="Adınızı Girin"
                            className="w-full py-4 px-4 bg-transparent border rounded-md text-white"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full py-4 px-4 bg-transparent border rounded-md text-white"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formState.password}
                                onChange={handleInputChange}
                                placeholder="Parola"
                                className="w-full py-4 px-4 bg-transparent border rounded-md text-white"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-4 py-2 text-white"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formState.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Parolayı Doğrulayın"
                                className="w-full py-4 px-4 bg-transparent border rounded-md text-white"
                            />
                            <button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 px-4 py-2 text-white"
                            >
                                {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <button disabled={isLoading} onClick={handleRegister} className="disabled:opacity-50 w-full py-4 bg-teal-500 text-white rounded-md">
                            {isLoading ? 'Yükleniyor...' : 'Kayıt Ol'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}