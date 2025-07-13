import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const RiderAssign = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ['adminUnassignedParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parsels?status=unpaid&delivary_status=not_collection');
      return res.data;
    }
  });

  if (isLoading) return <p className="p-6">Loading parcels...</p>;
  if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Assign Rider to Parcel</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Weight</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel.parcelId}>
                <td>{index + 1}</td>
                <td>{parcel.ParcelName}</td>
                <td>{parcel.weight} kg</td>
                <td>
                  {parcel.SenderName}<br />
                  {parcel.SenderContact}<br />
                  {parcel.SenderDistrict}
                </td>
                <td>
                  {parcel.ReceiverName}<br />
                  {parcel.ReceiverContact}<br />
                  {parcel.ReceiverDistrict}
                </td>
                <td>{parcel.cost}৳</td>
                <td>
                  <span className="badge badge-warning">{parcel.delivary_status}</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    Assign Rider
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

export default RiderAssign;
