import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Debounced API call when search text changes
  const searchUserByEmail = debounce(async (value) => {
    if (!value) {
      setFilteredUsers([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosSecure.get(`/admin/user?email=${value}`);
      setFilteredUsers(res.data || []);
    } catch (error) {
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  }, 600);

  // ⏳ Run search every time input changes
  useEffect(() => {
    searchUserByEmail(search);
    return () => searchUserByEmail.cancel();
  }, [search]);

  // ✅ Role update handler
  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch('/admin/user-role', {
        email,
        role: newRole
      });

      Swal.fire('Success', res.data.message, 'success');

      // Update the local user role state
      setFilteredUsers((prev) =>
        prev.map((u) =>
          u.email === email ? { ...u, role: newRole } : u
        )
      );
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
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {loading && <p>Loading...</p>}

      {filteredUsers.length > 0 ? (
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
              {filteredUsers.map((user, index) => (
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
                        className="btn btn-warning btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user.email, 'admin')}
                        className="btn btn-success btn-sm"
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
      ) : search.length > 0 && !loading ? (
        <p className="text-gray-500">No user found with this email.</p>
      ) : null}
    </div>
  );
};

export default MakeAdmin;
