import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const HomePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://images.unsplash.com/photo-1730473313350-054540683cd1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1549624523-8b6241ac724b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    const texts = [
        {
            title: 'Bağlan, Taşı, Teslim Et',
            description: 'Pazaryerimize katılın ve güvenilir taşıma firmalarından hızlı teklifler alın.'
        },
        {
            title: 'Hızlı ve Güvenli Taşıma',
            description: 'Ev taşıma hizmetlerinizde en iyi taşıma firmalarını burada bulabilirsiniz.'
        },
        {
            title: 'İhtiyaçlarınıza Uygun Çözümler',
            description: 'Ağır ekipman taşımacılığından ofis taşımasına kadar geniş bir yelpazede hizmet.'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="min-h-screen bg-transparent text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden">
                <div
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>

                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex justify-center items-center h-full text-center px-6 sm:px-8">
                    <div className="text-white">
                        <h1 className="text-4xl sm:text-6xl font-semibold mb-6">
                            {texts[currentIndex].title}
                        </h1>
                        <p className="text-base sm:text-2xl text-gray-300 mb-8">
                            {texts[currentIndex].description}
                        </p>
                        <a
                            href="#jobs"
                            className="px-6 py-3 bg-green-500 text-white rounded-full text-lg hover:bg-green-400 transition"
                        >
                            İşleri Keşfedin
                        </a>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition z-20"
                >
                    &lt;
                </button>

                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition z-20"
                >
                    &gt;
                </button>
            </section>

            {/* Jobs Section */}
            <section id="jobs" className="px-8 py-16 sm:py-24 max-w-7xl mx-auto">
                <div className="text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Öne Çıkan Taşıma İşleri</h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8">
                        Mevcut taşıma işlerini gözden geçirin ve tekliflerinizle başvurun.
                    </p>

                    <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
                        <table className="min-w-full table-auto text-left text-white">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="py-4 px-6 text-lg">İş Başlığı</th>
                                    <th className="py-4 px-6 text-lg">Açıklama</th>
                                    <th className="py-4 px-6 text-lg">Yükleme Adresi</th>
                                    <th className="py-4 px-6 text-lg">Boşaltma Adresi</th>
                                    <th className="py-4 px-6 text-lg">Tarih</th>
                                    <th className="py-4 px-6 text-lg">Yük Türü</th>
                                    <th className="py-4 px-6 text-lg">Araç Türü</th>
                                    <th className="py-4 px-6 text-lg">Detay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Job 1 */}
                                <tr className="hover:bg-gray-700 transition duration-300">
                                    <td className="py-4 px-6">Mobilya Taşıma</td>
                                    <td className="py-4 px-6 text-gray-300">Büyük mobilyaları şehir içinde taşımaya mı ihtiyacınız var? Teklifinizi şimdi gönderin!</td>
                                    <td className="py-4 px-6">Kadıköy, İstanbul</td>
                                    <td className="py-4 px-6">Beşiktaş, İstanbul</td>
                                    <td className="py-4 px-6">25 Kasım 2024</td>
                                    <td className="py-4 px-6">Mobilya</td>
                                    <td className="py-4 px-6">Kamyonet</td>
                                    <td className="py-4 px-6">
                                        <a href="#job-detail" className="inline-block px-6 py-2 bg-green-500 text-nowrap text-white rounded-full text-lg hover:bg-green-400 transition">
                                            ilana git
                                        </a>
                                    </td>
                                </tr>

                                {/* Job 2 */}
                                <tr className="hover:bg-gray-700 transition duration-300">
                                    <td className="py-4 px-6">Ofis Taşıma</td>
                                    <td className="py-4 px-6 text-gray-300">Ofis eşyalarını ve malzemeleri yeni bir konuma taşımak için teklif alın.</td>
                                    <td className="py-4 px-6">Şişli, İstanbul</td>
                                    <td className="py-4 px-6">Üsküdar, İstanbul</td>
                                    <td className="py-4 px-6">30 Kasım 2024</td>
                                    <td className="py-4 px-6">Ofis Eşyaları</td>
                                    <td className="py-4 px-6">Kamyon</td>
                                    <td className="py-4 px-6">
                                        <a href="#job-detail" className="inline-block px-6 py-2 bg-green-500 text-white rounded-full text-lg hover:bg-green-400 transition">
                                            ilana git
                                        </a>
                                    </td>
                                </tr>

                                {/* Job 3 */}
                                <tr className="hover:bg-gray-700 transition duration-300">
                                    <td className="py-4 px-6">Ağır Ekipman Taşıma</td>
                                    <td className="py-4 px-6 text-gray-300">Ağır makineleri taşımaya mı ihtiyacınız var? Bu işi almak için teklif gönderin.</td>
                                    <td className="py-4 px-6">Beylikdüzü, İstanbul</td>
                                    <td className="py-4 px-6">Kartal, İstanbul</td>
                                    <td className="py-4 px-6">15 Aralık 2024</td>
                                    <td className="py-4 px-6">Ağır Ekipman</td>
                                    <td className="py-4 px-6">Dorseli Kamyon</td>
                                    <td className="py-4 px-6">
                                        <a href="#job-detail" className="inline-block px-6 py-2 bg-green-500 text-white text-nowrap rounded-full text-lg hover:bg-green-400 transition">
                                            ilana git
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-transparent">
                <div className="max-w-7xl mx-auto px-6 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                        Nasıl Çalışır?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center bg-transparent rounded-lg overflow-hidden shadow-xl backdrop-blur-md border border-white/10">
                        {/* Right Side: Explanation */}
                        <div className="w-full sm:w-full p-8 sm:px-12 flex flex-col justify-center space-y-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-green-500 mb-4">Adım 1: Bağlan</h3>
                            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                                Pazaryerimize katıldığınızda, taşıma hizmeti sağlamak isteyen firmalarla hızlıca iletişim kurabilirsiniz. Farklı firmalardan teklif alarak, ihtiyacınıza en uygun olanını seçebilirsiniz.
                            </p>

                            <h3 className="text-xl sm:text-2xl font-semibold text-green-500 mb-4">Adım 2: Taşıma</h3>
                            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                                Seçtiğiniz taşıma firması ile anlaşma sağladıktan sonra, taşınacak eşyalarınız güvenli bir şekilde taşınır. Güvenli taşıma için çeşitli seçeneklerimiz mevcuttur.
                            </p>

                            <h3 className="text-xl sm:text-2xl font-semibold text-green-500 mb-4">Adım 3: Teslimat</h3>
                            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                                Son olarak, taşınan eşyalarınız belirtilen yeni adrese güvenli bir şekilde teslim edilir. Hizmetinizin her adımını takip edebilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default HomePage;
