import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';// ✅ Import MapUpdater
import MapUpdater from './MapUpdater ';

const position = [23.8103, 90.4125]; // Dhaka

const Coverage = () => {
    const location = useLoaderData();
    console.log(location)

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(location);

    useEffect(() => {
        const filtered = location.filter((loca) =>
            loca.district.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLocations(filtered);
    }, [searchTerm, location]);

    return (
        <div className="px-6 py-10 w-10/13 mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800">
                We are available in <span className="text-green-600">64 districts</span>
            </h1>

            {/* Search Box */}
            <div className="mt-6 flex justify-center">
                <div className="flex items-center w-full max-w-md border rounded-full overflow-hidden bg-white shadow-sm">
                    <input
                        type="text"
                        placeholder="Search by district name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-4 py-2 focus:outline-none"
                    />
                    <button
                        className="bg-lime-400 text-white font-semibold px-6 py-2 hover:bg-lime-500 transition"
                        onClick={() => { }}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Optional: No Results */}
            {filteredLocations.length === 0 && (
                <p className="text-center text-red-500 mt-4">
                    No district found with that name.
                </p>
            )}

            <h2 className="mt-10 my-6 text-xl font-semibold text-gray-800 text-left sm:text-center">
                We deliver almost all over <span className="font-bold">Bangladesh</span>
            </h2>

            <MapContainer
                center={position}
                zoom={7}
                scrollWheelZoom={false}
                className="h-[550px] w-full rounded-lg shadow"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />

                {/* ✅ Auto scroll and zoom when only 1 district matched */}
                {filteredLocations.length === 1 && (
                    <MapUpdater location={filteredLocations[0]} />
                )}

                {filteredLocations.map((loca, index) => (
                    <Marker key={index} position={[loca.latitude, loca.longitude]}>
                        <Popup>
                            <strong>{loca.district}</strong>
                            <br />
                            <span>{loca.covered_area.join(', ')}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Coverage;
