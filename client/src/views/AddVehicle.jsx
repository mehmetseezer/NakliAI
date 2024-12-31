import React, { useState } from "react";

const AddVehicle = () => {
    const [vehicle, setVehicle] = useState({
        name: "",
        type: "",
        photo: "https://images.pexels.com/photos/4573797/pexels-photo-4573797.jpeg", // Varsayılan rastgele fotoğraf
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Yeni Araç Eklendi:", vehicle);
        alert("Araç başarıyla eklendi!");
    };

    // Rastgele araç fotoğrafları için URL'ler
    const randomPhotos = [
        "https://images.pexels.com/photos/4573797/pexels-photo-4573797.jpeg", // Fotoğraf 1
        "https://images.pexels.com/photos/5631696/pexels-photo-5631696.jpeg", // Fotoğraf 2
        "https://images.pexels.com/photos/4373125/pexels-photo-4373125.jpeg", // Fotoğraf 3
        "https://images.pexels.com/photos/6762495/pexels-photo-6762495.jpeg", // Fotoğraf 4
        "https://images.pexels.com/photos/2397655/pexels-photo-2397655.jpeg", // Fotoğraf 5
    ];

    const handleRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * randomPhotos.length);
        setVehicle((prev) => ({
            ...prev,
            photo: randomPhotos[randomIndex],
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Araç Ekle</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2">
                            Araç Adı
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={vehicle.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                            placeholder="Örn: Ford Transit"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2">
                            Araç Türü
                        </label>
                        <input
                            type="text"
                            name="type"
                            value={vehicle.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                            placeholder="Örn: Van"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2">
                            Araç Fotoğrafı
                        </label>
                        <input
                            type="text"
                            name="photo"
                            value={vehicle.photo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                            placeholder="Örn: https://example.com/photo.jpg"
                            required
                        />
                        <div className="mt-4">
                            <h3 className="text-gray-700 font-semibold mb-2">Rastgele Fotoğraflar</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {randomPhotos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer rounded-lg overflow-hidden shadow-lg"
                                        onClick={() => setVehicle({ ...vehicle, photo })}
                                    >
                                        <img
                                            src={photo}
                                            alt={`Araç Fotoğrafı ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Araç Ekle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;
