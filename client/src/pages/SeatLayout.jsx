/* eslint-disable react-hooks/exhaustive-deps */


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import isoTimeFormat from "../lib/isoTimeFormat";

import { ClockIcon, ArrowRightIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {

  const groupRows = [
    ["A","B"],
    ["C","D"],
    ["E","F"],
    ["G","H"],
    ["I","J"],
  ];

  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  /* ================= GET SHOW ================= */

  const getShow = () => {

    if (!id) return;

    const foundShow = dummyShowsData.find(
      (movie) => movie._id === id
    );

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  /* ================= SEAT CLICK ================= */

  const handleSeatClick = (seatId) => {

    if (!selectedTime)
      return toast("Please select timing first");

    if (
      !selectedSeats.includes(seatId) &&
      selectedSeats.length >= 5
    ) {
      return toast("Maximum 5 seats allowed");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  /* ================= SEAT RENDER ================= */

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {

          const seatId = `${row}${i + 1}`;

          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60
              ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, [id]);

  /* ================= SAFETY CHECK ================= */

  if (!show || !date) {
    return <Loading />;
  }

  const timings = show.dateTime?.[date] || [];

  /* ================= UI ================= */

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">

      {/* TIMINGS */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">

        <p className="text-lg font-semibold px-6">
          Available Timings
        </p>

        <div className="mt-5 space-y-1">

          {timings.length > 0 ? (
            timings.map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer
                ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p>{isoTimeFormat(item.time)}</p>
              </div>
            ))
          ) : (
            <p className="px-6 text-sm text-red-400">
              No timings available
            </p>
          )}

        </div>
      </div>

      {/* SEATS */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">

        <BlurCircle top="-100px" left="-100px"/>
        <BlurCircle bottom="0" right="0"/>

        <h1 className="text-2xl font-semibold mb-4">
          Select your Seat
        </h1>

        <img src={assets.screenImage} alt="screen"/>
        <p className="text-gray-400 text-sm mb-6">
          SCREEN SIDE
        </p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">

          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 mb-6">
            {groupRows[0].map(renderSeats)}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(renderSeats)}
              </div>
            ))}
          </div>

        </div>

        <button onClick={()=>navigate('/my-bookings')} className="flex items-center gap-1 mt-20 px-10 py-3 text-sm
        bg-primary hover:bg-primary-dull transition rounded-full font-medium
        cursor-pointer active:scale-95">
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;