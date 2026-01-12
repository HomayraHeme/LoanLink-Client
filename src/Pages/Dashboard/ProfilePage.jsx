 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useTheme } from "../../Theme/ThemeContext";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading";
import { FaUserEdit, FaSave, FaTimes, FaSignOutAlt, FaEnvelope, FaShieldAlt, FaIdBadge, FaCheckCircle } from "react-icons/fa";

const ProfilePage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [dbUser, setDbUser] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, logOut, updateUserProfile, setUser } = useAuth();

  // ১. ডাটাবেজ থেকে ডাটা লোড করার ফাংশন
  const fetchUserData = async () => {
    if (user?.email) {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setDbUser(res.data);
        setFormData({
          displayName: res.data.displayName || user.displayName || "",
          photoURL: res.data.photoURL || user.photoURL || "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setFetching(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSave = async () => {
    if (!formData.displayName) {
      return Swal.fire("Error", "Name cannot be empty", "error");
    }

    setLoading(true);
    try {
        const res = await axiosSecure.patch("/users/profile", {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      if (res.data.success) {
         if (updateUserProfile) {
          await updateUserProfile(formData.displayName, formData.photoURL);
        }
        
         setUser({ 
          ...user, 
          displayName: formData.displayName, 
          photoURL: formData.photoURL 
        });

         await fetchUserData();
        
        setIsEditing(false);
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your changes have been saved to the database!",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Could not update profile in database", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (fetching) return <Loading />;

  const bgColor = isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900";
  const cardBg = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inputStyle = isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-gray-900";

  return (
    <div className={`${bgColor} min-h-screen py-10 px-4 transition-all duration-300`}>
      <div className="max-w-3xl mx-auto">
        <div className={`rounded-3xl shadow-2xl overflow-hidden border ${cardBg}`}>
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700"></div>
          
          <div className="px-8 pb-10">
             <div className="relative -mt-16 flex justify-center mb-6">
              <img
                src={formData.photoURL || "https://i.ibb.co/3S3mX5V/default-profile.png"}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-xl bg-white"
                onError={(e) => e.target.src = "https://i.ibb.co/3S3mX5V/default-profile.png"}
              />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">{dbUser?.displayName}</h2>
              <p className="text-sm opacity-60">{dbUser?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                <label className="text-xs font-bold opacity-50 uppercase ml-1">Full Name</label>
                {isEditing ? (
                  <input
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border outline-none ${inputStyle}`}
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-gray-500/5 border border-gray-500/10 font-medium italic">
                    {dbUser?.displayName || "N/A"}
                  </div>
                )}
              </div>

               {isEditing && (
                <div className="space-y-1">
                  <label className="text-xs font-bold opacity-50 uppercase ml-1">Photo URL</label>
                  <input
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border outline-none ${inputStyle}`}
                  />
                </div>
              )}

               <div className="space-y-1">
                <label className="text-xs font-bold opacity-50 uppercase ml-1 flex items-center gap-1">
                  <FaIdBadge className="text-emerald-500" /> Account Role
                </label>
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 font-bold uppercase tracking-wider">
                  {dbUser?.role || "Borrower"}
                </div>
              </div>

               <div className="space-y-1">
                <label className="text-xs font-bold opacity-50 uppercase ml-1 flex items-center gap-1">
                  <FaCheckCircle className="text-blue-500" /> Member Status
                </label>
                <div className={`p-3 rounded-xl border font-bold uppercase tracking-wider ${
                  dbUser?.status === "suspended" ? "bg-red-500/5 border-red-500/20 text-red-500" : "bg-blue-500/5 border-blue-500/20 text-blue-500"
                }`}>
                  {dbUser?.status || "Active"}
                </div>
              </div>
            </div>

             <div className="mt-10 flex flex-wrap gap-4 justify-between items-center border-t border-gray-500/10 pt-8">
              <button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
                <FaSignOutAlt /> Sign Out
              </button>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="px-6 py-2 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave} 
                      disabled={loading}
                      className="px-6 py-2 btn-primary font-bold flex items-center gap-2"
                    >
                      {loading ? <span className="loading loading-spinner loading-sm btn-primary"></span> : <FaSave />}
                      Save Profile
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="px-6 py-2 btn-primary font-bold flex items-center gap-2"
                  >
                    <FaUserEdit /> Edit Details
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;