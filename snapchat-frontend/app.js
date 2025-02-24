import { useState } from "react";
import axios from "axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/signup", { username, password });
    alert("User registered");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    await axios.post("http://localhost:5000/upload", formData);
    alert("Image uploaded");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold">Signup</h2>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 rounded"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded mt-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleSignup}
      >
        Signup
      </button>

      <h2 className="text-xl font-bold mt-4">Upload Image</h2>
      <input
        type="file"
        className="border p-2 rounded"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="bg-green-500 text-white p-2 rounded mt-2"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}
