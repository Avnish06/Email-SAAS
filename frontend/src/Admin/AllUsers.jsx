import axios from "axios"
import { AppUrl } from "../App";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "lucide-react";

export const AllUsers = () => {
    const [data, setData] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get(AppUrl + "/admin/getUserdetails");
            setData(response.data.user);
            console.log(response.data.user);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black tracking-tighter">User Management</h3>
                <Link 
                    to="/admin/templates"
                    className="px-6 py-3 bg-foreground text-background rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                >
                    <Layout size={18} />
                    Manage Templates
                </Link>
            </div>
            <div className="grid gap-4">
                {data && data.length > 0 ? (
                    data.map(user => (
                        <div key={user._id} className="p-6 border border-border rounded-[24px] bg-card shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-lg">{user.email}</p>
                                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">ID: {user._id.slice(-6)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link 
                                        to={`/admin/edit-user/${user._id}`}
                                        className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all"
                                    >
                                        Edit
                                    </Link>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                        user.status === 'Active' 
                                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                                    }`}>
                                        {user.status || 'Active'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-secondary/30 rounded-[32px] border border-dashed border-border">
                        <p className="font-bold text-muted-foreground">No users found in the system.</p>
                    </div>
                )}
            </div>
        </div>
    );
};