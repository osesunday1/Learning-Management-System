import { useState, useEffect } from "react";
import useFetch from "../../components/customHooks/useFetch";

const UserProfile = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const userID = localStorage.getItem("userID");

    // ✅ Fetch user data
    const { data: userData, loading } = useFetch(userID ? `${apiUrl}/users/me` : null);

    // ✅ Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    });

    // ✅ Populate form with user data
    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
            });
        }
    }, [userData]);

    // ✅ Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submit (Update user profile)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/users/users/${userID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

        } catch (error) {
            console.error("Update error:", error);
            alert("Something went wrong. Try again.");
        }
    };

    if (loading || !userData) {
        return <p className="text-center text-gray-500 mt-5">Loading user data...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
            <div className="mt-5 flex flex-col items-center">
                <img 
                    src={userData.photo || "/default-avatar.png"} 
                    alt="User Avatar" 
                    className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
                <p className="mt-3 text-lg font-medium">{userData.firstName}</p>
                <p className="mt-3 text-lg font-medium">{userData.lastName}</p>
                <p className="text-gray-600">{userData.email}</p>
            </div>

            {/* ✅ Edit Profile Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-gray-700">First Name</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UserProfile;