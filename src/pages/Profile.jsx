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
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ send token to backend
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

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
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
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
        `${import.meta.env.VITE_API_URL}/api/users/profile-picture`,
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
        `${import.meta.env.VITE_API_URL}/api/users/profile-picture`,
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

      <div className="flex justify-center px-4 py-12 relative">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-gray-600 to-gray-400" />

        {/* Card */}
        <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
          {/* ===== Avatar Section ===== */}
          <div className="flex flex-col items-center pb-6 border-b">
            <img
              src={preview || "/assets/home2.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border"
            />

            <div className="flex gap-3 mt-3">
              <label className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                Change Photo
              </label>

              {user?.profilePic && (
                <button
                  onClick={handleRemovePhoto}
                  className="text-sm px-4 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
                >
                  Remove
                </button>
              )}
            </div>

            <h1 className="mt-4 text-xl font-semibold text-gray-900">
              {formData.name}
            </h1>
          </div>

          {/* ===== Profile Info ===== */}
          {!editing && (
            <div className="mt-6 space-y-4 text-sm">
              {[
                ["Email", user?.email],
                ["Contact", user?.contact],
                ["City", "Rewa"],
                ["State", "Madhya Pradesh"],
                ["Country", "India"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* ===== Edit Form ===== */}
          {editing && (
            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Contact
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  value={formData.email}
                  disabled
                  className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {/* ===== Actions ===== */}
          {!editing && (
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setEditing(true)}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/previous-services")}
                className="w-full py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition"
              >
                Previous Services
              </button>

              <div className="pt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
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
