import { useQuery } from '@tanstack/react-query';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PendingRider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: riders = [], isLoading, isError, error } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rider/pending');
            return res.data;
        }
    });

    // 🟡 View handler
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

    // ✅ Approve handler
    const handleApprove = (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to approve this rider?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Approved!', 'Rider has been approved.', 'success');
                // TODO: Add API call and refetch here
            }
        });
    };

    // ❌ Delete handler
    const handleDelete = (email) => {
        Swal.fire({
            title: 'Delete Rider?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Rider has been removed.', 'success');
                // TODO: Add API call and refetch here
            }
        });
    };

    if (isLoading) return <p className="p-6 text-lg">Loading...</p>;
    if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Pending Riders</h2>

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
                            <th className="text-center">Actions</th>
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
                                    <span className="badge badge-warning text-white">Pending</span>
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => handleView(rider)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleApprove(rider.email)}
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(rider.email)}
                                    >
                                        <FaTrash />
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

export default PendingRider;
