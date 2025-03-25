import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [verse, setVerse] = useState({ arabic: "", english: "" });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVerse = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://daily-reminder-b-e.vercel.app/api/verse"
      );
      setVerse(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching verse", error);
      setError("Failed to fetch the verse. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function todaysDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const monthIndex = today.getMonth();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[monthIndex];

    setDate(`${day} ${monthName}`);
  }

  useEffect(() => {
    fetchVerse();
    todaysDate();
  }, []);

  return (
    <>
      <div className="relative flex flex-col items-center justify-evenly  h-screen bg-[url('/bg7.jpeg')] bg-cover bg-right bg-no-repeat sm:bg-cover px-2">
        <div className="absolute left-4 top-4 text-[#E6D6C1] text-xl font-english">
          {date}
        </div>

        <h1 className="text-3xl font-bold mb-4 text-[#E6D6C1] font-english">
          Daily Reminder
        </h1>

        <div className="flex flex-col items-center justify-center min-h-[150px] shadow-sm mb-16">
          {loading ? (
            <p className="text-xl mb-2 text-[#E6D6C1]">Loading...</p>
          ) : error ? (
            <p className="text-xl mb-2 text-[#E6D6C1]">{error}</p>
          ) : (
            <>
              <p className="text-2xl mb-2 text-[#E6D6C1] text-center font-arabic">
                {verse.arabic}
              </p>
              <p className="text-lg text-[#E6D6C1] text-center italic font-english">
                {verse.english}
              </p>
            </>
          )}
        </div>

        <button
          onClick={fetchVerse}
          className="px-6 py-3 mt-4 bg-[#5C4537] font-english text-[#e6d6c1] font-semibold rounded-full border border-[#a09788] hover:bg-[#5c4537ee] active:bg-[#5c45379b]"
        >
          Get Your Daily Reminder
        </button>
      </div>
    </>
  );
}
