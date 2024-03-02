"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import accountService from "../../service/api/account";

const profilePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    username: "",
    email: "",
    picture: null,
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const profile: any = await accountService.getProfile(token);
        if (profile?.results) {
          const { username, first_name, last_name, picture, phone, email } =
            profile.results;
          setFormData({
            username: username || "",
            first_name: first_name || "",
            last_name: last_name || "",
            picture: picture || null,
            phone: phone || "",
            email: email || "",
          });
        } else {
          console.log("Profile results not found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(formData);
  }, []);

  const handleChange = async (e: any) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        picture: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleEditProfile = async (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-2xl text-black font-bold mb-4">Edit Profile</h1>
        {formData.picture && (
          <div className="mb-4">
            <img
              src={
                formData?.picture
                  ? formData.picture
                  : URL.createObjectURL(formData.picture)
              }
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
          </div>
        )}
        <label htmlFor="picture" className="block text-gray-700 font-bold mb-2">
          Choose Profile Picture
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          className="py-2"
        />
      </div>
      <div className="mb-4">
        <form onSubmit={handleEditProfile} className="max-w-md mx-auto">
          <div className="mb-4 flex flex-col">
            <label htmlFor="username" className="text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="firstName" className="text-gray-700 font-bold mb-2">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.first_name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="firstName" className="text-gray-700 font-bold mb-2">
              Last name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.last_name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="firstName" className="text-gray-700 font-bold mb-2">
              Phone number
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default profilePage;
