import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppUrl } from "../App";
import { toast } from "react-toastify";

export const EditUserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phonenumber: "",
        status: "Active",
        password: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${AppUrl}/admin/getuser/${id}`);
                const { name, email, phonenumber, status } = response.data.user;
                setFormData({
                    name: name || "",
                    email: email || "",
                    phonenumber: phonenumber || "",
                    status: status || "Active",
                    password: ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                toast.error("Failed to fetch user details");
                navigate("/adminPanel");
            }
        };

        fetchUser();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${AppUrl}/admin/edituserdetails/${id}`, formData);
            toast.success("User updated successfully");
            navigate("/adminPanel");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="mb-8">
                <h3 className="text-3xl font-black tracking-tighter">Edit User</h3>
                <p className="text-muted-foreground">Update details for user ID: {id}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 border border-border rounded-[32px] shadow-sm">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[18px] bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[18px] bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                    <input
                        type="text"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[18px] bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[18px] bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">New Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[18px] bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 px-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-[18px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/adminPanel")}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-black uppercase tracking-widest rounded-[18px] hover:bg-secondary/80 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
