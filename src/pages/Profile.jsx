import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    country: "",
  });

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://rapidm2b.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setUser(data);
          setPreview(data.profilePic || "");
          setFormData({
            name: data.name || "",
            email: data.email || "",
            contact: data.contact || "",
            city: data.city || "",
            state: data.state || "",
          });
        } else {
          toast.error("Please log in to access your profile.", {
            position: "top-center",
          });
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading profile. Please try again later.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://rapidm2b.onrender.com/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ send token to backend
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully! 🎉", {
          position: "top-center",
        });
        setUser(data);
        setEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("https://rapidm2b.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      toast.info("Logged out successfully!", { position: "top-center" });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // quick client-side checks
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG/PNG/WebP allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large (max 5MB)");
      return;
    }

    // show preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Upload immediately (or you can wait until user clicks Save Changes)
    handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file); // backend expects 'image'

      const res = await fetch(
        "https://rapidm2b.onrender.com/api/users/profile-picture",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data?.success) {
        toast.success(data.message || "Profile photo updated");

        // prefer returned user, but fallback to existing user
        const updatedUser = data?.user || user;
        setUser(updatedUser);

        // preview: prefer server URL (final), else keep existing preview or fallback avatar
        setPreview(
          updatedUser?.profilePic || user?.profilePic || "/assets/home2.png"
        );
      } else {
        // When server responds with non-OK, show proper error and revert preview
        toast.error(data?.message || "Upload failed");
        setPreview(user?.profilePic || "/assets/home2.png");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Try again.");
      setPreview(user?.profilePic || "/assets/home2.png");
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://rapidm2b.onrender.com/api/users/profile-picture",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Profile photo removed");

        setUser(data.user);
        setPreview("/assets/home2.png");
      } else {
        toast.error(data.message || "Failed to delete photo");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Error removing photo");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-b from-black via-gray-500 to-gray-300">
        <p className="text-lg">Loading Profile...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-5 py-10 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-gray-500 to-gray-300"></div>

        <div className="bg-white max-w-lg w-full p-8 rounded-3xl shadow-lg text-center">
          <div className="flex flex-col items-center">
            <div className="mb-3">
              <img
                src={preview || "/assets/home2.png"}
                alt="Profile"
                className="rounded-full h-24 w-24 object-cover border"
              />
            </div>

            <div className="flex gap-2">
              <label className="py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                />
                Change Photo
              </label>

              {user?.profilePic && (
                <button
                  onClick={handleRemovePhoto}
                  className="py-2 px-3 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <h1 className="text-gray-900 font-bold text-2xl mt-4">
            {formData.name}
          </h1>
          <div className="h-0.5 w-4/5 bg-gray-300 my-4 mx-auto"></div>

          {editing ? (
            <form onSubmit={handleUpdate} className="text-left space-y-4">
              <div>
                <label className="text-gray-700 font-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-700 font-semibold">Contact</label>
                <input
                  type="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <div className="text-left space-y-3">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Contact:</strong> {user?.contact}
              </p>
              <p>
                <strong>City:</strong> {"Rewa"}
              </p>
              <p>
                <strong>State:</strong> {"Madhya Pradesh"}
              </p>
              <p>
                <strong>Country:</strong> {"India"}
              </p>

              <div className="flex flex-col gap-3 mt-5">
                <button
                  onClick={() => setEditing(true)}
                  className="py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => navigate("/previous-services")}
                  className="py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  Previous Services
                </button>

                <button
                  onClick={handleLogout}
                  className="py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
