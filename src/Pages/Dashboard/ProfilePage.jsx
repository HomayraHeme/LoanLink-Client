 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useTheme } from "../../Theme/ThemeContext";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading";
import { FaUserEdit, FaSave, FaTimes, FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [profileUser, setProfileUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: "",
        photoURL: ""
    });

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user, logOut, updateUserProfile } = useAuth();

    // Fetch User Data from DB
    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.email || !axiosSecure) return;

            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                const userData = res.data;

                const userInfo = {
                    name: userData.name || user.displayName || "Unknown",
                    email: userData.email || user.email,
                    photoURL: userData.photoURL || user.photoURL || "https://i.ibb.co/3S3mX5V/default-profile.png",
                    role: userData.role || "User",
                    status: userData.status || "Active"
                };
                setProfileUser(userInfo);
                setFormData({ name: userInfo.name, photoURL: userInfo.photoURL });
            } catch (err) {
                console.error("Fetch User Error:", err);
            }
        };

        fetchUser();
    }, [user?.email, axiosSecure]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save Profile to DB and Firebase
    const handleSave = async () => {
        if (!formData.name || !formData.photoURL) {
            return Swal.fire("Error", "Fields cannot be empty", "error");
        }

        setLoading(true);
        try {
            // 1. Update in MongoDB
            const res = await axiosSecure.patch(`/users/${user.email}`, {
                name: formData.name,
                photoURL: formData.photoURL
            });

            if (res.data.matchedCount > 0) {
                // 2. Update in Firebase (Optional but recommended for UI consistency)
                if (updateUserProfile) {
                    await updateUserProfile(formData.name, formData.photoURL);
                }

                // 3. Update Local State
                setProfileUser({ ...profileUser, ...formData });
                setIsEditing(false);
                Swal.fire("Success", "Profile updated successfully!", "success");
            }
        } catch (err) {
            console.error("Update Error:", err);
            Swal.fire("Error", "Failed to update profile", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logOut().then(() => {
            localStorage.removeItem("access-token");
            Swal.fire("Logged Out", "See you again!", "success");
            navigate("/login");
        });
    };

    if (!user) return navigate("/login");
    if (!profileUser) return <Loading />;

    // Theme Based Styles
    const bgColor = isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900";
    const cardBg = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
    const inputStyle = isDark 
        ? "bg-gray-800 border-gray-700 text-white focus:border-emerald-500" 
        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-emerald-600";

    return (
        <div className={`${bgColor} min-h-screen py-12 px-4 transition-all duration-300`}>
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className={`text-4xl font-black ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                        Account Settings
                    </h2>
                    <p className="opacity-60 mt-2">Manage your public profile and account details</p>
                </div>

                {/* Main Card */}
                <div className={`p-8 rounded-3xl shadow-2xl border ${cardBg} transition-all`}>
                    
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <img
                                src={isEditing ? formData.photoURL : profileUser.photoURL}
                                alt="Profile"
                                className="w-36 h-36 object-cover rounded-full border-4 border-emerald-500 p-1 shadow-xl transition-transform group-hover:scale-105"
                                onError={(e) => {e.target.src = "https://i.ibb.co/3S3mX5V/default-profile.png"}}
                            />
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                                    Previewing...
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full">
                                {profileUser.role}
                            </span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-bold mb-2 opacity-70">Display Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-xl border outline-none transition-all ${inputStyle}`}
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <p className="text-lg font-semibold px-1">{profileUser.name}</p>
                            )}
                        </div>

                        {/* Email Field (Non-Editable) */}
                        <div>
                            <label className="block text-sm font-bold mb-2 opacity-70">Email Address</label>
                            <p className={`text-lg px-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                {profileUser.email}
                            </p>
                        </div>

                        {/* Photo URL (Only in Edit Mode) */}
                        {isEditing && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-bold mb-2 opacity-70">Profile Photo URL</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-xl border outline-none transition-all ${inputStyle}`}
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                        )}

                        {/* Account Status */}
                        {!isEditing && (
                            <div className="flex items-center gap-2 pt-2">
                                <div className={`w-2 h-2 rounded-full ${profileUser.status === "Active" ? "bg-green-500" : "bg-red-500"}`}></div>
                                <span className="text-sm font-medium opacity-70">Status: {profileUser.status}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 space-y-3">
                        {isEditing ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                                >
                                    {loading ? <span className="loading loading-spinner loading-sm"></span> : <FaSave />}
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ name: profileUser.name, photoURL: profileUser.photoURL });
                                    }}
                                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
                                >
                                    <FaTimes />
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                                >
                                    <FaUserEdit />
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${isDark ? "border-red-900/50 text-red-400 hover:bg-red-950/30" : "border-red-100 text-red-600 hover:bg-red-50"}`}
                                >
                                    <FaSignOutAlt />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;