import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useTheme } from "../../Theme/ThemeContext";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import useAuth from "../../Hooks/useAuth";

const ProfilePage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    // State to hold profile data fetched from MongoDB (role, status)
    const [profileUser, setProfileUser] = useState(null);
    const navigate = useNavigate();

    // ✅ Correct usage of useAxiosSecure (taking the function, not array destructuring)
    const axiosSecure = useAxiosSecure();
    // Data from Firebase Auth context
    const { user, logOut } = useAuth();

    useEffect(() => {
        // ✅ Fixel: fetchUser defined inside useEffect to satisfy exhaustive-deps rule
        const fetchUser = async () => {
            // Guard clause: Ensure necessary data is available before API call
            if (!user?.email || !axiosSecure) return;

            try {
                // API call to fetch additional user data (role, status) from MongoDB
                const res = await axiosSecure.get(`/users/${user.email}`);
                setProfileUser(res.data);
            } catch (err) {
                console.error("Fetch User Error:", err);
                // Handle case where profile data might not exist in MongoDB yet
                if (err.response && err.response.status === 404) {
                    // Use Firebase data as fallback if not found in DB
                    setProfileUser({
                        email: user.email,
                        name: user.displayName || "Unknown",
                        photoURL: user.photoURL,
                        role: "User (Default)",
                        status: "Active (Default)"
                    });
                } else {
                    // Swal.fire("Error", "Failed to load user info", "error");
                }
            }
        };

        // Trigger fetch when user or axiosSecure is ready
        if (user?.email && axiosSecure) {
            fetchUser();
        }

    }, [user?.email, axiosSecure]);

    // Logout
    const handleLogout = () => {
        if (logOut) {
            logOut()
                .then(() => {
                    localStorage.removeItem("access-token");
                    Swal.fire("Logged Out", "You have been logged out", "success");
                    navigate("/login");
                })
                .catch(err => {
                    console.error("Logout Error:", err);
                    Swal.fire("Error", "Logout failed. Try again.", "error");
                });
        } else {
            localStorage.removeItem("access-token");
            Swal.fire("Logged Out", "You have been logged out", "success");
            navigate("/login");
        }
    };

    // --- Conditional Renders ---
    if (!user) return navigate("/login");

    // Show loading until profileUser (from MongoDB or fallback) is set
    if (!profileUser) return <p className="text-center py-10">Loading profile...</p>;

    // Theme colors
    const bgColor = isDark ? "bg-gray-900" : "bg-green-100";
    const cardBg = isDark ? "bg-gray-800" : "bg-white";
    const cardText = isDark ? "text-gray-200" : "text-gray-600";
    const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";

    return (
        <div className={`${bgColor} min-h-screen py-10 px-4`}>
            <div className="max-w-2xl mx-auto">
                <h2 className={`text-3xl font-extrabold mb-6 text-center ${headingColor}`}>My Profile</h2>

                <div className={`p-6 rounded-lg shadow-md ${cardBg} ${cardText} flex flex-col items-center gap-4`}>
                    {/* Use MongoDB data (profileUser) or Firebase data (user) for fallback */}
                    <img
                        src={profileUser.photoURL || user.photoURL || "/default-profile.png"}
                        alt={profileUser.name || user.displayName || "User"}
                        className="w-32 h-32 object-cover rounded-full border-2 border-emerald-500"
                    />

                    <div className="w-full flex flex-col gap-2 text-center md:text-left">
                        {/* Display data, prioritizing profileUser (MongoDB data) */}
                        <p><strong>Name:</strong> {profileUser.name || user.displayName || "N/A"}</p>
                        <p><strong>Email:</strong> {profileUser.email || user.email}</p>
                        <p><strong>Role:</strong> {profileUser.role || "N/A"}</p>
                        <p><strong>Status:</strong> {profileUser.status || "N/A"}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className='btn-primary px-40 w-full'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;