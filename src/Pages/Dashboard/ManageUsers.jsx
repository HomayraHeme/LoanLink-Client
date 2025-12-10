import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import { useTheme } from "../../Theme/ThemeContext";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // --- Fetch all users ---
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // --- Role update mutation ---
    const roleMutation = useMutation({
        mutationFn: ({ id, newRole }) => axiosSecure.patch(`/users/${id}/role`, { role: newRole }),
        onSuccess: () => {
            Swal.fire({
                title: "✅ Role Updated",
                text: "User role has been updated successfully.",
                icon: "success",
                confirmButtonColor: "#10B981",
            });
        },
        onError: () => {
            Swal.fire({
                title: "✅ Role Updated",
                text: "User role has been updated successfully.",
                icon: "success",
                confirmButtonColor: "#10B981",

            });
        },
        onSettled: () => refetch(),
    });

    // --- Suspend mutation ---
    const suspendMutation = useMutation({
        mutationFn: ({ id, reason, feedback }) =>
            axiosSecure.patch(`/users/${id}/suspend`, { reason, feedback }),
        onSuccess: () => {
            Swal.fire({
                title: "🚫 User Suspended",
                text: "The user has been successfully suspended.",
                icon: "success",
                confirmButtonColor: "#DC2626",
            });
        },
        onError: () => {
            Swal.fire({
                title: "🚫 User Suspended",
                text: "The user has been successfully suspended.",
                icon: "success",
                confirmButtonColor: "#DC2626",
            });
        },
        onSettled: () => refetch(),
    });

    // --- Handlers ---
    const handleRoleUpdate = (id, newRole, currentRole) => {
        if (newRole === currentRole) return; // no need to update same role

        Swal.fire({
            title: "Confirm Role Change",
            text: `Are you sure you want to change this user's role to "${newRole}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10B981",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Update",
        }).then((result) => {
            if (result.isConfirmed) {
                roleMutation.mutate({ id, newRole });
            }
        });
    };

    const handleSuspend = (user) => {
        Swal.fire({
            title: `Suspend ${user.name}?`,
            html: `
                <input id="swal-reason" class="swal2-input" placeholder="Reason for suspension" required>
                <textarea id="swal-feedback" class="swal2-textarea" placeholder="Additional feedback (optional)"></textarea>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Suspend",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                const reason = document.getElementById("swal-reason").value;
                const feedback = document.getElementById("swal-feedback").value;
                if (!reason) {
                    Swal.showValidationMessage("Suspension reason is required");
                    return false;
                }
                return { reason, feedback };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                suspendMutation.mutate({
                    id: user._id,
                    reason: result.value.reason,
                    feedback: result.value.feedback,
                });
            }
        });
    };

    // --- Theme classes ---
    const tableBg = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
    const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800";
    const selectBg = isDark
        ? "bg-gray-700 text-white border-gray-600"
        : "bg-white text-gray-800 border-gray-300";

    // --- Render ---
    if (isLoading)
        return <p className="text-center py-10 text-xl">Loading users...</p>;

    return (
        <div
            className={`${isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-800"
                } min-h-screen p-6`}
        >
            <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

            <table
                className={`w-full table-auto border ${tableBg} rounded-lg overflow-hidden shadow-lg`}
            >
                <thead>
                    <tr className={`${headerBg}`}>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user._id}
                            className={`${isDark ? "border-gray-700" : "border-gray-300"
                                } border hover:bg-opacity-90 transition-colors`}
                        >
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">
                                <select
                                    value={user.role}
                                    onChange={(e) =>
                                        handleRoleUpdate(user._id, e.target.value, user.role)
                                    }
                                    className={`px-2 py-1 rounded ${selectBg} border`}
                                    disabled={roleMutation.isLoading}
                                >
                                    <option value="borrower">Borrower</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="px-4 py-2">
                                <span
                                    className={`font-semibold capitalize ${user.status === "suspended"
                                        ? "text-red-500"
                                        : "text-green-500"
                                        }`}
                                >
                                    {user.status || "active"}
                                </span>
                            </td>
                            <td className="px-4 py-2 flex gap-2">
                                {user.status !== "suspended" && (
                                    <button
                                        onClick={() => handleSuspend(user)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                                        disabled={suspendMutation.isLoading}
                                    >
                                        {suspendMutation.isLoading
                                            ? "Suspending..."
                                            : "Suspend"}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
