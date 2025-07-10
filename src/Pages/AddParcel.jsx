import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const AddParcel = () => {
  const {User} = useAuth();
  const location = useLoaderData();
  const { register, handleSubmit, watch } = useForm();

  const [fromData, setFromData] = useState("not-document");
  const [WeightDisable, setWeightDisable] = useState(true);
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");

  const uniqueRegions = [...new Set(location.map((loc) => loc.region))];
  const AxiosSecure = useAxiosSecure();

  // Utility to extract districts from a region
  const getDistrictsByRegion = (region) => {
    const filtered = location.filter((loc) => loc.region === region);
    const districts = filtered.flatMap((loc) =>
      typeof loc.covered_area === "string"
        ? loc.covered_area.split(",").map((d) => d.trim())
        : Array.isArray(loc.covered_area)
          ? loc.covered_area.map((d) => d.trim())
          : []
    );
    return [...new Set(districts)];
  };

  const senderDistricts = getDistrictsByRegion(senderRegion);
  const receiverDistricts = getDistrictsByRegion(receiverRegion);

  const handelChange = (e) => {
    const selectedType = e.target.value;
    setFromData(selectedType);
    setWeightDisable(selectedType === "not-document");
  };

  const weight = parseFloat(watch("weight")) || 0;
  const parcelType = watch("parcelType") || fromData;
  const isSameRegion = senderRegion && receiverRegion && senderRegion === receiverRegion;

  let deliveryCost = 0;

  if (parcelType === "document") {
    deliveryCost = isSameRegion ? 60 : 80;
  } else {
    if (weight <= 3) {
      deliveryCost = isSameRegion ? 110 : 150;
    } else {
      const base = isSameRegion ? 110 : 150;
      const extra = Math.ceil(weight - 3) * 40;
      deliveryCost = base + extra;
    }
  }
  const today = new Date().toLocaleDateString('en-CA');
  const parcelId = uuidv4();
  const onSubmit = (data) => {
    const addParsel = {
      ...data,
      cost: deliveryCost,
      date: today,
      parcelId,
      create_by: User?.email,
      status: "unpaid"
    };
    console.log(addParsel);
    AxiosSecure.post('/parsels', addParsel).then(res => {
      console.log(res.data.insertedId)
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Parsel create successfull",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }).catch(error => console.log(error))
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Parcel</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Details */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Parcel Details</h2>

          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center">
              <input
                type="radio"

                {...register("parcelType")}
                value="not-document"
                onChange={handelChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="document" className="ml-2 text-sm text-gray-700">
                Document
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"

                {...register("parcelType")}
                value="document"
                onChange={handelChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="not-document" className="ml-2 text-sm text-gray-700">
                Not-Document
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Name</label>
              <input
                type="text"
                {...register("ParcelName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Weight (KG)</label>
              <input
                type="number"
                {...register("weight")}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${WeightDisable && "cursor-not-allowed"}`}
                disabled={WeightDisable}
                required
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="mt-4 text-blue-700 font-semibold">
            Estimated Delivery Cost: ৳{deliveryCost}
          </div>
        </div>

        {/* Sender Details */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Sender Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
              <input
                type="text"
                {...register("SenderName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Contact No</label>
              <input
                type="text"
                {...register("SenderContact")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Region</label>
              <select
                {...register("SenderRegion")}
                onChange={(e) => setSenderRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender District</label>
              <select
                {...register("SenderDistrict")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select District</option>
                {senderDistricts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Address</label>
              <input
                type="text"
                {...register("SenderAddress")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Instruction</label>
              <input
                type="text"
                {...register("pickupInstruction")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">* PickUp Time 4pm–7pm Approx.</p>
            </div>
          </div>
        </div>

        {/* Receiver Details */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Receiver Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
              <input
                type="text"
                {...register("ReceiverName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Contact No</label>
              <input
                type="text"
                {...register("ReceiverContact")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Region</label>
              <select
                {...register("ReceiverRegion")}
                onChange={(e) => setReceiverRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver District</label>
              <select
                {...register("ReceiverDistrict")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select District</option>
                {receiverDistricts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Address</label>
              <input
                type="text"
                {...register("ReceiverAddress")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instruction</label>
              <input
                type="text"
                {...register("ReceiverDeliveryInstruction")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
