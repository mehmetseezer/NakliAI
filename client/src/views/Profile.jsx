import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Web Developer, tech enthusiast, and coffee lover.",
        location: "San Francisco, CA",
        joined: "January 2023",
        avatar: "https://picsum.photos/seed/picsum/150",
    };

    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(user.name);
    const [updatedEmail, setUpdatedEmail] = useState(user.email);
    const [updatedBio, setUpdatedBio] = useState(user.bio);
    const [updatedLocation, setUpdatedLocation] = useState(user.location);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const vehicles = [
        { id: 1, name: "Mercedes-Benz Sprinter", type: "Van", plate: "34ABC123" },
        { id: 2, name: "Ford Transit", type: "Van", plate: "35XYZ456" },
        { id: 3, name: "Volvo FH", type: "Truck", plate: "36DEF789" }
    ];

    const transportJobs = [
        { id: 1, job: "Şehir İçi Taşıma", date: "Eylül 2023" },
        { id: 2, job: "Yurt Dışı Nakliye", date: "Kasım 2023" },
        { id: 3, job: "Özel Taşıma", date: "Ocak 2024" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <Navbar />
            <div className="container mx-auto max-w-5xl p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-6">
                    <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-4 border-gray-600 shadow-lg"
                    />
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    className="w-full text-2xl font-semibold text-gray-100 bg-transparent border-b-2 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                                    placeholder="Adınızı girin"
                                />
                                <input
                                    type="text"
                                    value={updatedLocation}
                                    onChange={(e) => setUpdatedLocation(e.target.value)}
                                    className="w-full text-gray-100 bg-transparent border-b-2 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                                    placeholder="Konumunuzu girin"
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>
                                <p className="text-gray-300">{user.location}</p>
                                <p className="text-sm text-gray-500">Katılım Tarihi: {user.joined}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Info Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-100">Kullanıcı Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Email:</span>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    className="border-b-2 bg-transparent text-gray-100 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                                    placeholder="Email adresinizi girin"
                                />
                            ) : (
                                <span className="text-gray-100">{user.email}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Biyografi:</span>
                            {isEditing ? (
                                <textarea
                                    value={updatedBio}
                                    onChange={(e) => setUpdatedBio(e.target.value)}
                                    className="border-b-2 bg-transparent text-gray-100 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                                    rows="3"
                                    placeholder="Kısa bir biyografi yazın"
                                />
                            ) : (
                                <span className="text-gray-100">{user.bio}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vehicles Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-100">Araçlarım</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="p-4 rounded-xl bg-gradient-to-tr from-gray-800/50 via-gray-700/50 to-gray-800/50 shadow-xl backdrop-blur-md"
                            >
                                <h4 className="text-lg font-semibold text-gray-100">{vehicle.name}</h4>
                                <p className="text-gray-300">Tür: {vehicle.type}</p>
                                <p className="text-gray-300">Plaka: {vehicle.plate}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transport Jobs Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-100">Aldığım Nakliye İşleri</h3>
                    <div className="space-y-4 mt-4">
                        {transportJobs.map((job) => (
                            <div
                                key={job.id}
                                className="flex justify-between p-4 bg-gradient-to-r from-gray-800/60 via-gray-700/60 to-gray-800/60 rounded-lg shadow-md backdrop-blur-md"
                            >
                                <span className="text-gray-100">{job.job}</span>
                                <span className="text-gray-400">{job.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Edit Button */}
                <div className="mt-8 flex justify-end">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition"
                        >
                            Kaydet
                        </button>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition"
                        >
                            Profili Düzenle
                        </button>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Profile;
