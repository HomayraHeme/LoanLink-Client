import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useTheme } from "../../Theme/ThemeContext";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading";

const ProfilePage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [profileUser, setProfileUser] = useState(null);
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const { user, logOut } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.email || !axiosSecure) return;

            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                const userData = res.data;

                setProfileUser({
                    name: userData.name || user.displayName || "Unknown",
                    email: userData.email || user.email,
                    photoURL: userData.photoURL || user.photoURL || "/default-profile.png",
                    role: userData.role || "User",
                    status: userData.status || "Active"
                });
            } catch (err) {
                console.error("Fetch User Error:", err);

                setProfileUser({
                    email: user.email,
                    name: user.displayName || "Unknown",
                    photoURL: user.photoURL || "/default-profile.png",
                    role: "User",
                    status: "Active"
                });

                if (!err.response || err.response.status !== 404) {
                    Swal.fire("Error", "Failed to load user info", "error");
                }
            }
        };

        fetchUser();
    }, [user?.email, axiosSecure]);

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

    if (!user) return navigate("/login");
    if (!profileUser) return <p className="text-center py-10"><Loading></Loading></p>;

    const bgColor = isDark ? "bg-gray-900" : "bg-green-100";
    const cardBg = isDark ? "bg-gray-800" : "bg-white";
    const cardText = isDark ? "text-gray-200" : "text-gray-600";
    const headingColor = isDark ? "text-emerald-300" : "text-emerald-800";

    return (
        <div className={`${bgColor} min-h-screen py-10 px-4`}>
            <div className="max-w-2xl mx-auto">
                <h2 className={`text-3xl font-extrabold mb-6 text-center ${headingColor}`}>My Profile</h2>

                <div className={`p-6 rounded-lg shadow-md ${cardBg} ${cardText} flex flex-col items-center gap-4`}>
                    <img
                        src={profileUser.photoURL}
                        alt={profileUser.name}
                        className="w-32 h-32 object-cover rounded-full border-2 border-emerald-500"
                    />

                    <div className="w-full flex flex-col gap-2 text-center md:text-left">
                        <p><strong>Name:</strong> {profileUser.name}</p>
                        <p><strong>Email:</strong> {profileUser.email}</p>
                        <p><strong>Role:</strong> {profileUser.role}</p>
                        <p><strong>Status:</strong> {profileUser.status}</p>
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
