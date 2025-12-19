import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookAMeeting = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const getBookedTimes = async () => {
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        toast.error("please provide a token");
        return;
      }
      const response = await axios.get(
        backendUrl + "/api/meetings/getBookedTimes",
        { headers: { token } }
      );
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      const data = response.data.meetingData;
      if (!data) {
        toast.error("Unknown error please try again");
        return;
      }
      setUnavailableDates(
        data.map((item: { bookedTime: string }) => item.bookedTime)
      );
      console.log(unavailableDates);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message, { autoClose: 1000 });
      } else {
        toast.error("An unknown error occurred please try again.", {
          autoClose: 1000,
        });
      }
    }
  };
  useEffect(() => {
    getBookedTimes();
  }, []);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];
  return (
    <div className="min-h-screen bg-[#001427] text-white px-4 sm:px-8 md:px-16 py-12">
      {/* Header section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1] animate-gradient-x">
          Book a Meeting
        </h1>
        <p className="text-lg sm:text-xl text-[#9FD6FF] max-w-2xl mx-auto">
          Wanna talk to our team live? Feel free to book a meeting.
        </p>
      </div>

      {/* Meeting section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#0a1a33] divide-y divide-[#0a1a33] rounded-xl shadow-lg shadow-[#0a1a33]/50">
          <thead className="bg-[#0a1a33]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-[#9FD6FF] border-b border-[#0a1a33]">
                Time
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-4 py-3 text-left font-semibold text-[#9FD6FF] border-b border-[#0a1a33]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {times.map((time) => (
              <tr
                key={time}
                className={`transition-all duration-300 hover:scale-105 hover:bg-[#002140]`}
              >
                <td className="px-4 py-2 border-b border-[#0a1a33]">{time}</td>
                {days.map((day) => {
                  const slot = `${day} ${time}`;
                  const isBooked = unavailableDates.includes(slot);
                  return (
                    <td
                      key={day}
                      className={`px-4 py-2 font-semibold border-b border-[#0a1a33] ${
                        isBooked
                          ? "text-red-500 animate-pulse"
                          : "text-green-400 animate-pulse"
                      }`}
                    >
                      {isBooked ? "Booked" : "Available"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookAMeeting;
