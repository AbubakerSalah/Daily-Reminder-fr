import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [verse, setVerse] = useState({ arabic: "", english: "" });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch verse from the API
  const fetchVerse = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://daily-reminder-fr.vercel.app/api/verse");
      setVerse(response.data);
      console.log((response.data))
    } catch (error) {
      setError("Failed to fetch verse.");
    } finally {
      setLoading(false);
    }
  };

  // Set today's date
  const getDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = today.toLocaleString("default", { month: "long" });
    setDate(`${day} ${month}`);
  };

  useEffect(() => {
    fetchVerse();
    getDate();
  }, []);

  return (
    <>
      <div className="relative flex flex-col items-center justify-evenly h-screen bg-[url('/bg7.jpeg')] bg-cover bg-right bg-no-repeat sm:bg-cover px-2">
        <div className="absolute left-4 top-4 text-[#E6D6C1] text-xl">
          {date}
        </div>

        <h1 className="text-3xl font-bold mb-4 text-[#E6D6C1]">
          Daily Reminder
        </h1>

        <div className="flex flex-col items-center justify-center min-h-[150px]">
          {loading ? (
            <p className="text-xl mb-2 text-[#E6D6C1]">Loading...</p>
          ) : error ? (
            <p className="text-xl mb-2 text-[#E6D6C1]">{error}</p>
          ) : (
            <>
              <p className="text-xl mb-2 text-[#E6D6C1] text-center">
                {verse.arabic}
              </p>
              <p className="text-lg text-[#E6D6C1] text-center italic">
                {verse.english}
              </p>
            </>
          )}
        </div>

        <button
          onClick={fetchVerse}
          className="px-6 py-3 mt-4 bg-[#5C4537] text-[#e6d6c1] font-semibold rounded-md hover:bg-[#5c4537ee]"
        >
          Get Your Daily Reminder
        </button>
      </div>
    </>
  );
}
