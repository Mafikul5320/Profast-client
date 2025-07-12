import { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [queryKey, setQueryKey] = useState('');

  // Debounce input so API doesn't hit on every keystroke
  const debounceSearch = debounce((value) => {
    setQueryKey(value);
  }, 500);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  // Fetch user using TanStack Query
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['searchUser', queryKey],
    enabled: !!queryKey, // Only run when queryKey is not empty
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/user?email=${queryKey}`);
      return res.data;
    },
  });

  // ✅ Handle role change
  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch('/admin/user-role', { email, role: newRole });
      Swal.fire('Success', res.data.message, 'success');
      refetch(); // refresh data
    } catch (err) {
      Swal.fire('Error', 'Failed to update role', 'error');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage User Role (Admin)</h2>

      <input
        type="text"
        placeholder="Search user by email"
        className="input input-bordered w-full mb-4"
        onChange={handleInputChange}
        value={search}
      />

      {isLoading && <p className="text-gray-600">Loading...</p>}

      {!isLoading && users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full shadow-md border border-base-300">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.displayName || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-warning'}`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td>
                    {new Date(user.login_at || user.created_at || Date.now()).toLocaleDateString()}
                  </td>
                  <td>
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRoleChange(user.email, 'user')}
                        className="btn bg-red-600 text-white btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user.email, 'admin')}
                        className="btn btn-success text-white btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : search && !isLoading ? (
        <p className="text-gray-500">No user found with this email.</p>
      ) : null}
    </div>
  );
};

export default MakeAdmin;
