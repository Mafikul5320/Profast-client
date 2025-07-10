import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcel = () => {
  const { User } = useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ['my-parsel', User?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parsels?email=${User?.email}`);
      return res.data;
    }
  })
  const handelDeleted = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-green-600 text-white",
        cancelButton: "btn bg-red-600 text-white"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parsels/${id}`).then(res => {
          console.log(res.data)
          if (res.data.acknowledged) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch()
          }
        }).catch(error => {
          console.log(error)
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }
  const handelPay = (id) => {
    navigate(`/dashboard/${id}`)
  }
  return (
    <div className="p-4">
      <table className="min-w-full border rounded-xl overflow-hidden shadow-lg bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Cost</th>
            <th className="py-3 px-4 text-left">Created By</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((parcel) => (
            <tr key={parcel._id} className="border-b hover:bg-gray-100 transition">
              <td className="py-3 px-4">{parcel.ParcelName}</td>
              <td className="py-3 px-4 text-green-600 font-semibold">৳{parcel.cost}</td>
              <td className="py-3 px-4">{parcel.create_by}</td>
              <td className="py-3 px-4">{parcel.date}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${parcel.status === "unpaid" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                  {parcel.status}
                </span>
              </td>
              <td className="py-3 px-4  space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">View</button>
                <button onClick={() => handelDeleted(parcel.parcelId)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">Delete</button>
                <button onClick={() => handelPay(parcel.parcelId)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcel;