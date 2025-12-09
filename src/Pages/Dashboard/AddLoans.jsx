import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSeceure";
import { useTheme } from "../../Theme/ThemeContext";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const AddLoans = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        short_description: "",
        description: "",
        loan_category: "",
        interest_rate: "",
        max_loan_limit: "",
        requiredDocuments: "",
        available_emi_plan: "",
        image: "",
        showOnHome: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                title: formData.title,
                short_description: formData.short_description,
                loan_category: formData.loan_category,
                description: formData.description,
                showOnHome: formData.showOnHome,

                interest_rate: parseFloat(formData.interest_rate) || 0,
                max_loan_limit: parseFloat(formData.max_loan_limit) || 0,

                available_emi_plan: formData.available_emi_plan.split(',').map(p => p.trim()).filter(p => p),
                requiredDocuments: formData.requiredDocuments.split(',').map(d => d.trim()).filter(d => d),


                image: formData.image || "https://via.placeholder.com/600x400.png?text=Default+Loan+Image",
                createdBy: user?.email || "admin@example.com",
                created_at: new Date().toISOString(),
            };

            const res = await axiosSecure.post("/add-loan", payload);

            if (res.data?.insertedId) {
                Swal.fire("Success", "Loan added successfully!", "success");
                navigate("/all-loans");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.response?.data?.message || "Failed to add loan. Please check server.", "error");
        }
    };

    const inputBg = isDark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300";
    const formBg = isDark ? "bg-gray-900 text-white" : "bg-green-100 text-gray-900";

    return (
        <div className={`max-w-3xl mx-auto p-6 rounded-lg shadow-md ${formBg} min-h-screen`}>
            <h2 className="text-2xl font-bold mb-4 text-center">Add Loan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Loan Title"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="short_description"
                    placeholder="Short Description"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.short_description}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Detailed Description"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.description}
                    onChange={handleChange}
                    required
                />


                <input
                    type="url"
                    name="image"
                    placeholder="Main Image URL (e.g. from ImgBB or Cloudinary)"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.image}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="loan_category"
                    placeholder="Category (e.g., Personal, Home, Car)"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.loan_category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="interest_rate"
                    placeholder="Interest Rate (%)"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.interest_rate}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="max_loan_limit"
                    placeholder="Max Loan Limit (BDT/USD)"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.max_loan_limit}
                    onChange={handleChange}
                    required
                />




                <input
                    type="text"
                    name="available_emi_plan"
                    placeholder="EMI Plans (comma separated: e.g., 12 Months, 24 Months)"
                    className={`w-full px-3 py-2 rounded ${inputBg}`}
                    value={formData.available_emi_plan}
                    onChange={handleChange}
                />

                <label className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        name="showOnHome"
                        checked={formData.showOnHome}
                        onChange={handleChange}
                        className="accent-emerald-500"
                    />
                    Show on Home
                </label>

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full mt-4">
                    Add Loan
                </button>
            </form>
        </div>
    );
};

export default AddLoans;