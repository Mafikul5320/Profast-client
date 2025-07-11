import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ActiveRider = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/rider/active');
      return res.data;
    }
  });

  // View Rider Info
  const handleView = (rider) => {
    Swal.fire({
      title: rider.name,
      html: `
        <strong>Email:</strong> ${rider.email}<br/>
        <strong>Region:</strong> ${rider.region}<br/>
        <strong>District:</strong> ${rider.warehouse}<br/>
        <strong>Status:</strong> ${rider.status}
      `,
      imageUrl: rider.photoURL || '/default-user.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Rider Image'
    });
  };

  if (isLoading) return <p className="p-6 text-lg">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.warehouse}</td>
                <td>
                  <span className="badge badge-success text-white">Active</span>
                </td>
                <td className="flex justify-center">
                  <button onClick={() => handleView(rider)} className="btn btn-sm btn-info">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRider;
