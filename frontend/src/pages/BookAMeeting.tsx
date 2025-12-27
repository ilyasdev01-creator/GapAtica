import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { format, addDays, isPast, isSameDay } from "date-fns";

// Types
interface MeetingSlot {
  id?: string;
  day: string;
  time: string;
  fullDate: Date;
  formattedDate: string;
  isBooked: boolean;
  bookedBy?: {
    name: string;
    email: string;
    phone?: string;
  };
  meetingType?: "consultation" | "demo" | "support" | "other";
  status?: "confirmed" | "pending" | "cancelled";
}

interface BookedMeeting {
  id: string;
  bookedTime: string;
  bookedDate: string;
  userDetails?: {
    name: string;
    email: string;
    phone?: string;
  };
  meetingType?: "consultation" | "demo" | "support" | "other";
  status?: "confirmed" | "pending" | "cancelled";
}

// Constants
// Updated to start from Monday, Dec 30th (since Saturday Dec 28th and Sunday Dec 29th are weekends)
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIMES = [
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

const MEETING_TYPES = [
  { id: "consultation", label: "Consultation", color: "bg-blue-500" },
  { id: "demo", label: "Product Demo", color: "bg-purple-500" },
  { id: "support", label: "Technical Support", color: "bg-green-500" },
  { id: "other", label: "Other", color: "bg-gray-500" },
];

// Icon Components (Fallback if lucide-react not installed)
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const LoaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-[#00FFD1] animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const BookAMeeting = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [bookedMeetings, setBookedMeetings] = useState<BookedMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<MeetingSlot | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Calculate starting date - Monday Dec 30th, 2024
  const getInitialStartDate = () => {
    const today = new Date();
    // If today is Saturday (6) or Sunday (0), start from next Monday
    const dayOfWeek = today.getDay();
    let daysToAdd = 0;

    if (dayOfWeek === 6) {
      // Saturday
      daysToAdd = 2; // Monday
    } else if (dayOfWeek === 0) {
      // Sunday
      daysToAdd = 1; // Monday
    } else if (dayOfWeek === 1) {
      // Monday
      daysToAdd = 0;
    } else {
      // Tuesday to Friday
      // Show next week
      daysToAdd = 8 - dayOfWeek; // Get to next Monday
    }

    const nextMonday = addDays(today, daysToAdd);
    return nextMonday;
  };

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getInitialStartDate()
  );
  const [meetingType, setMeetingType] = useState("consultation");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [filters, setFilters] = useState({
    showAvailable: true,
    showBooked: true,
    meetingType: "all",
  });

  // Fetch booked meetings from backend
  const fetchBookedMeetings = useCallback(async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      if (!token) {
        toast.error("Please login to view meetings");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/api/meetings/getBookedTimes`,
        { headers: { token } }
      );

      if (response.data.success) {
        setBookedMeetings(response.data.meetingData || []);
      } else {
        toast.error(response.data.message || "Failed to fetch meetings");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Network error occurred");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // Get current week dates
  const getWeekDates = useMemo(() => {
    const weekDates = DAYS.map((_, index) => {
      const date = addDays(currentWeekStart, index);
      return {
        dayName: DAYS[index],
        date,
        formatted: format(date, "MMM dd"),
        fullFormatted: format(date, "EEEE, MMMM dd, yyyy"),
      };
    });
    return weekDates;
  }, [currentWeekStart]);

  // Generate meeting slots
  const meetingSlots = useMemo(() => {
    const slots: MeetingSlot[][] = TIMES.map((time) =>
      getWeekDates.map((dayInfo) => {
        const slotDateTime = new Date(dayInfo.date);
        const [timeStr, period] = time.split(" ");
        let [hours, minutes] = timeStr.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        slotDateTime.setHours(hours, minutes || 0, 0, 0);

        const slotString = `${dayInfo.dayName} ${time}`;
        const bookedMeeting = bookedMeetings.find(
          (meeting) => meeting.bookedTime === slotString
        );

        return {
          day: dayInfo.dayName,
          time,
          fullDate: slotDateTime,
          formattedDate: `${dayInfo.formatted} at ${time}`,
          isBooked: !!bookedMeeting,
          bookedBy: bookedMeeting?.userDetails,
          id: bookedMeeting?.id,
          meetingType: bookedMeeting?.meetingType,
          status: bookedMeeting?.status,
        };
      })
    );
    return slots;
  }, [getWeekDates, bookedMeetings]);

  // Filter slots based on filters
  const filteredSlots = useMemo(() => {
    return meetingSlots.map((row) =>
      row.filter((slot) => {
        if (slot.isBooked && !filters.showBooked) return false;
        if (!slot.isBooked && !filters.showAvailable) return false;
        if (
          filters.meetingType !== "all" &&
          slot.meetingType !== filters.meetingType
        )
          return false;
        return true;
      })
    );
  }, [meetingSlots, filters]);

  // Check if slot is in the past
  const isSlotInPast = (slot: MeetingSlot) => {
    return isPast(slot.fullDate) && !isSameDay(slot.fullDate, new Date());
  };

  // Book a meeting - FIXED: Ensure all required data is sent
  const bookMeeting = async () => {
    if (!selectedSlot) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book a meeting");
      return;
    }

    // Validate inputs
    if (!userDetails.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!userDetails.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/meetings/bookMeeting`,
        {
          slot: `${selectedSlot.day} ${selectedSlot.time}`,
          date: selectedSlot.fullDate.toISOString(),
          userDetails: {
            name: userDetails.name.trim(),
            email: userDetails.email.trim(),
            phone: userDetails.phone.trim() || undefined,
          },
          meetingType,
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Meeting booked successfully!");
        setShowBookingModal(false);
        setSelectedSlot(null);
        setUserDetails({ name: "", email: "", phone: "" });
        fetchBookedMeetings();
      } else {
        toast.error(response.data.message || "Failed to book meeting");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to book meeting");
        console.error("Booking error:", error.response?.data);
      } else {
        toast.error("An error occurred");
        console.error("Booking error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a meeting
  const deleteMeeting = async (meetingId: string, slotString: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this meeting?"))
      return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/meetings/deleteMeeting`,
        {
          headers: { token },
          data: { meetingId, slotString },
        }
      );

      if (response.data.success) {
        toast.success("Meeting cancelled successfully");
        fetchBookedMeetings();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete meeting"
        );
      } else {
        toast.error("An error occurred");
      }
    }
  };

  // Handle slot click
  const handleSlotClick = (slot: MeetingSlot) => {
    if (slot.isBooked || isSlotInPast(slot)) return;
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  // Reset to current week
  const resetToCurrentWeek = () => {
    setCurrentWeekStart(getInitialStartDate());
  };

  // Navigate weeks
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  };

  // Stats
  const stats = useMemo(() => {
    const totalSlots = meetingSlots.flat().length;
    const bookedSlots = meetingSlots.flat().filter((s) => s.isBooked).length;
    const availableSlots = totalSlots - bookedSlots;
    const pastSlots = meetingSlots.flat().filter((s) => isSlotInPast(s)).length;

    return { totalSlots, bookedSlots, availableSlots, pastSlots };
  }, [meetingSlots]);

  useEffect(() => {
    fetchBookedMeetings();
  }, [fetchBookedMeetings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001427] flex items-center justify-center">
        <LoaderIcon />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001427] text-white px-4 sm:px-8 md:px-16 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
          Book a Meeting
        </h1>
        <p className="text-lg sm:text-xl text-[#9FD6FF] max-w-3xl mx-auto">
          Schedule a live session with our team. Choose from available time
          slots below.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0a1a33] p-4 rounded-xl border border-[#1a3a5f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9FD6FF]">Total Slots</p>
              <p className="text-2xl font-bold">{stats.totalSlots}</p>
            </div>
            <CalendarIcon />
          </div>
        </div>
        <div className="bg-[#0a1a33] p-4 rounded-xl border border-[#1a3a5f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9FD6FF]">Available</p>
              <p className="text-2xl font-bold text-green-400">
                {stats.availableSlots}
              </p>
            </div>
            <CheckCircleIcon />
          </div>
        </div>
        <div className="bg-[#0a1a33] p-4 rounded-xl border border-[#1a3a5f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9FD6FF]">Booked</p>
              <p className="text-2xl font-bold text-red-400">
                {stats.bookedSlots}
              </p>
            </div>
            <XCircleIcon />
          </div>
        </div>
        <div className="bg-[#0a1a33] p-4 rounded-xl border border-[#1a3a5f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9FD6FF]">Past</p>
              <p className="text-2xl font-bold text-gray-400">
                {stats.pastSlots}
              </p>
            </div>
            <ClockIcon />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-[#0a1a33] rounded-xl border border-[#1a3a5f]">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousWeek}
            className="p-2 rounded-lg bg-[#002140] hover:bg-[#003056] transition-colors"
            title="Previous week"
          >
            <ChevronLeftIcon />
          </button>

          <div className="text-center">
            <h3 className="font-semibold text-lg">
              Week of {format(getWeekDates[0].date, "MMM dd")} -{" "}
              {format(getWeekDates[4].date, "MMM dd")}
            </h3>
            <p className="text-sm text-[#9FD6FF]">
              {format(currentWeekStart, "MMMM yyyy")}
            </p>
          </div>

          <button
            onClick={goToNextWeek}
            className="p-2 rounded-lg bg-[#002140] hover:bg-[#003056] transition-colors"
            title="Next week"
          >
            <ChevronRightIcon />
          </button>

          <button
            onClick={resetToCurrentWeek}
            className="p-2 rounded-lg bg-[#002140] hover:bg-[#003056] transition-colors"
            title="Current week"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchBookedMeetings()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#002140] hover:bg-[#003056] transition-colors"
          >
            <RefreshIcon />
            Refresh
          </button>

          <div className="flex items-center gap-2">
            <FilterIcon />
            <select
              value={filters.meetingType}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, meetingType: e.target.value }))
              }
              className="bg-[#002140] border border-[#1a3a5f] rounded-lg px-3 py-2"
            >
              <option value="all">All Types</option>
              {MEETING_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  showAvailable: !prev.showAvailable,
                }))
              }
              className={`px-3 py-2 rounded-lg ${
                filters.showAvailable
                  ? "bg-green-500/20 text-green-400"
                  : "bg-[#002140]"
              }`}
            >
              Available
            </button>
            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  showBooked: !prev.showBooked,
                }))
              }
              className={`px-3 py-2 rounded-lg ${
                filters.showBooked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-[#002140]"
              }`}
            >
              Booked
            </button>
          </div>
        </div>
      </div>

      {/* Meeting Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1a3a5f] shadow-2xl shadow-[#0a1a33]/50">
        <table className="min-w-full">
          <thead className="bg-[#0a1a33]">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-[#9FD6FF] border-b border-[#1a3a5f]">
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  Time
                </div>
              </th>
              {getWeekDates.map((day) => (
                <th
                  key={day.dayName}
                  className="px-6 py-4 text-left font-bold text-[#9FD6FF] border-b border-[#1a3a5f]"
                >
                  <div>
                    <div className="text-sm">{day.dayName}</div>
                    <div className="text-xs opacity-75">{day.formatted}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TIMES.map((time, timeIndex) => (
              <tr
                key={time}
                className="hover:bg-[#002140]/50 transition-colors"
              >
                <td className="px-6 py-4 border-b border-[#1a3a5f] font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00FFD1]" />
                    {time}
                  </div>
                </td>
                {meetingSlots[timeIndex]?.map((slot, dayIndex) => {
                  const isPastSlot = isSlotInPast(slot);
                  const isToday = isSameDay(slot.fullDate, new Date());

                  // Check if slot should be shown based on filters
                  const shouldShowSlot =
                    (slot.isBooked && filters.showBooked) ||
                    (!slot.isBooked && filters.showAvailable);

                  if (!shouldShowSlot) return null;

                  return (
                    <td
                      key={`${time}-${dayIndex}`}
                      className="px-6 py-4 border-b border-[#1a3a5f]"
                    >
                      <div
                        onClick={() => !isPastSlot && handleSlotClick(slot)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          isPastSlot
                            ? "bg-gray-900/50 cursor-not-allowed"
                            : slot.isBooked
                            ? "bg-red-500/10 border border-red-500/20"
                            : "bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:scale-[1.02]"
                        } ${isToday ? "ring-1 ring-[#00FFD1]" : ""}`}
                      >
                        {slot.isBooked ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <UsersIcon />
                                <span className="text-red-400 font-medium">
                                  Booked
                                </span>
                              </div>
                              {slot.meetingType && (
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    slot.meetingType === "consultation"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : slot.meetingType === "demo"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : slot.meetingType === "support"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-gray-500/20 text-gray-400"
                                  }`}
                                >
                                  {
                                    MEETING_TYPES.find(
                                      (t) => t.id === slot.meetingType
                                    )?.label
                                  }
                                </span>
                              )}
                            </div>
                            {slot.bookedBy && (
                              <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <UserIcon />
                                  <span>{slot.bookedBy.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MailIcon />
                                  <span className="text-xs opacity-75">
                                    {slot.bookedBy.email}
                                  </span>
                                </div>
                              </div>
                            )}
                            {slot.id && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMeeting(
                                    slot.id!,
                                    `${slot.day} ${slot.time}`
                                  );
                                }}
                                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 mt-2"
                              >
                                <TrashIcon />
                                Cancel
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            {isPastSlot ? (
                              <div className="text-gray-400">
                                <ClockIcon />
                                <span className="text-sm">Past</span>
                              </div>
                            ) : (
                              <>
                                <CheckCircleIcon />
                                <span className="text-green-400 font-medium">
                                  Available
                                </span>
                                <div className="text-xs text-green-300 mt-1">
                                  Click to book
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-[#0a1a33] rounded-xl border border-[#1a3a5f]">
        <h4 className="font-semibold mb-2 text-[#9FD6FF]">Legend</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/40" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-500/20 border border-gray-500/40" />
            <span>Past</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded ring-1 ring-[#00FFD1]" />
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Booking Modal - FIXED: Made responsive */}
      {showBookingModal && selectedSlot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#001427] border border-[#1a3a5f] rounded-2xl max-w-md w-full p-6 shadow-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9FD6FF] to-[#00FFD1]">
              Book Meeting
            </h3>

            <div className="mb-6 p-4 bg-[#0a1a33] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon />
                <span className="font-semibold">{selectedSlot.day}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon />
                <span>{selectedSlot.time}</span>
              </div>
              <div className="mt-2 text-sm text-[#9FD6FF]">
                {format(selectedSlot.fullDate, "MMMM dd, yyyy")}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meeting Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MEETING_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setMeetingType(type.id)}
                      className={`p-3 rounded-lg border transition-colors text-sm ${
                        meetingType === type.id
                          ? `${type.color} border-transparent text-white`
                          : "bg-[#0a1a33] border-[#1a3a5f] hover:bg-[#002140]"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <div className="flex items-center gap-1">
                    <UserIcon />
                    Your Name
                  </div>
                </label>
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full bg-[#0a1a33] border border-[#1a3a5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <div className="flex items-center gap-1">
                    <MailIcon />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full bg-[#0a1a33] border border-[#1a3a5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <div className="flex items-center gap-1">
                    <PhoneIcon />
                    Phone Number (Optional)
                  </div>
                </label>
                <input
                  type="tel"
                  value={userDetails.phone}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full bg-[#0a1a33] border border-[#1a3a5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedSlot(null);
                  }}
                  className="flex-1 px-4 py-3 bg-[#0a1a33] hover:bg-[#002140] rounded-lg border border-[#1a3a5f] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={bookMeeting}
                  disabled={
                    submitting ||
                    !userDetails.name.trim() ||
                    !userDetails.email.trim()
                  }
                  className="flex-1 px-4 py-3 bg-linear-to-r from-[#9FD6FF] to-[#00FFD1] text-[#001427] font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#001427] border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-[#9FD6FF]">
        <AlertCircleIcon />
        All times are in your local timezone. Meetings are 60 minutes long.
      </div>
    </div>
  );
};

export default BookAMeeting;
