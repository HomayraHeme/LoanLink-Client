 import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { useTheme } from "../../Theme/ThemeContext";

const ProfilePage = () => {
  const { user, logOut, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState(null);
  const [formData, setFormData] = useState({ displayName: "", photoURL: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

   const fetchUserData = async () => {
    if (!user?.email) return;

    try {
      const token = await user.getIdToken(); 
      const res = await fetch(`https://loan-link-server-peach.vercel.app/users/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();
      setDbUser(data);
      setFormData({
        displayName: data.displayName || user.displayName || "",
        photoURL: data.photoURL || user.photoURL || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSave = async () => {
    if (!formData.displayName) return Swal.fire("Error", "Name cannot be empty", "error");

    setLoading(true);
    try {
      const token = await user.getIdToken();

      const res = await fetch("http://localhost:3000/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: formData.displayName,
          photoURL: formData.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Update failed");

      // update local state
      setDbUser({ ...dbUser, displayName: formData.displayName, photoURL: formData.photoURL });

      if (updateUserProfile) await updateUserProfile(formData.displayName, formData.photoURL);

      Swal.fire({ icon: "success", title: "Profile Updated!", timer: 1500, showConfirmButton: false });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
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

  // --- Theme Configuration (AllLoans matching) ---
  const styles = {
    pageBg: isDark ? 'bg-gray-900' : 'bg-green-100',
    cardBg: isDark ? 'bg-[#1e293b] border-gray-700 shadow-2xl' : 'bg-white border-gray-100 shadow-xl',
    textMain: isDark ? 'text-gray-100' : 'text-slate-800',
    textMuted: isDark ? 'text-gray-400' : 'text-slate-500',
    inputBg: isDark ? 'bg-[#334155] border-gray-600 text-white' : 'bg-slate-50 border-gray-200 text-gray-900',
   };

  return (
    <div className={`${styles.pageBg} min-h-screen py-10 px-4 transition-all duration-300`}>
      <div className="max-w-3xl mx-auto">
        <div className={`rounded-[3rem] overflow-hidden border ${styles.cardBg}`}>
          {/* Top Banner Area */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700"></div>
          
          <div className="px-8 pb-10">
            {/* User Photo */}
            <div className="relative -mt-16 flex justify-center mb-6">
              <img
                src={formData.photoURL || "https://i.ibb.co/3S3mX5V/default-profile.png"}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-[2rem] border-4 border-white shadow-xl transition-transform hover:scale-105"
              />
            </div>

            {/* Display Name & Role */}
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-black ${styles.textMain}`}>{dbUser?.displayName || "N/A"}</h2>
              <span className="inline-block px-3 py-1 mt-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 rounded-full uppercase tracking-widest">
                {dbUser?.role || "Borrower"}
              </span>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${styles.textMuted}`}>Full Name</label>
                {isEditing ? (
                  <input
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-2xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${styles.inputBg}`}
                  />
                ) : (
                  <div className={`p-3 rounded-2xl font-bold border border-transparent ${isDark ? 'bg-slate-800 text-emerald-400' : 'bg-gray-100 text-slate-800 italic'}`}>
                    {dbUser?.displayName || "N/A"}
                  </div>
                )}
              </div>

              {/* Email (Functionality: View Only) */}
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${styles.textMuted}`}>Email Address</label>
                <div className={`p-3 rounded-2xl font-bold border ${isDark ? 'border-gray-700 text-gray-400 bg-gray-800/50' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                  {dbUser?.email}
                </div>
              </div>

              {/* Role (Functionality: View Only) */}
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${styles.textMuted}`}>Account Role</label>
                <div className={`p-3 rounded-2xl font-bold capitalize ${isDark ? 'bg-emerald-900/20 text-emerald-500' : 'bg-emerald-50 text-emerald-700'}`}>
                  {dbUser?.role || "User"}
                </div>
              </div>

              {/* Status (Functionality: View Only) */}
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${styles.textMuted}`}>Status</label>
                <div className={`p-3 rounded-2xl font-bold capitalize ${dbUser?.status === 'suspended' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {dbUser?.status || 'Active'}
                </div>
              </div>

              {/* Photo URL (Only in edit mode) */}
              {isEditing && (
                <div className="md:col-span-2 space-y-1">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${styles.textMuted}`}>Photo URL</label>
                  <input
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-2xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${styles.inputBg}`}
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4 justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-8">
              <button onClick={handleLogout} className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline">
                Sign Out
              </button>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button onClick={() => setIsEditing(false)} className={`px-6 py-2 btn-secondary `}>
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={loading} className={`px-8 py-2 btn-primary font-bold active:scale-95 transition-all `}>
                      {loading ? "Saving..." : "Save Profile"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-8 py-2 btn-primary transition-all active:scale-95">
                    Edit Details
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