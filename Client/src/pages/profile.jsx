import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://127.0.0.1:4000/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(response.data.data.user);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    }

    getProfile();
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="border rounded p-6">
          <div className="mb-4">
            <p className="font-bold">Name</p>
            <p>{user.name}</p>
          </div>

          <div>
            <p className="font-bold">Email</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
