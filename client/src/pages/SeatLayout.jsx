/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import isoTimeFormat from "../lib/isoTimeFormat";
import { ClockIcon, ArrowRightIcon } from "lucide-react";
import toast from "react-hot-toast";

const SeatLayout = () => {

  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  /* ================= FETCH SHOW ================= */

  useEffect(() => {
    const foundShow = dummyShowsData.find(
      movie => movie._id === id
    );

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

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

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  /* ================= ROW ================= */

  const renderRow = (row) => (
    <div key={row} className="flex justify-center gap-3 my-2">
      {Array.from({ length: 9 }, (_, i) => {

        const seatId = `${row}${i + 1}`;
        const selected = selectedSeats.includes(seatId);

        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`
              w-9 h-9
              text-xs
              rounded-md border
              transition-all duration-200
              ${
                selected
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/40"
                  : "border-primary text-gray-300 hover:bg-primary/20"
              }
            `}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (!show || !date) return <Loading />;

  const timings = show.dateTime?.[date] || [];

  /* ================= UI ================= */

  return (
    <div
      className="
      bg-black
      min-h-screen
      text-white
      pt-28        /* ✅ NAVBAR SPACE FIX */
      pb-20
      px-6 lg:px-16
      relative
      overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[350px] h-[350px] bg-primary/30 blur-[180px] top-0 left-0"/>
      <div className="absolute w-[350px] h-[350px] bg-primary/20 blur-[180px] bottom-0 right-0"/>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-14">

        {/* ================= TIMINGS ================= */}

        <div
          className="
          bg-primary/10
          border border-primary/30
          rounded-xl
          p-6
          backdrop-blur-md
          h-fit
          lg:sticky lg:top-32
          "
        >
          <h2 className="text-lg font-semibold mb-6">
            Available Timings
          </h2>

          {timings.map(item => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`
              flex items-center gap-3
              p-3 mb-2
              rounded-lg cursor-pointer transition
              ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20 text-gray-300"
              }
              `}
            >
              <ClockIcon size={16}/>
              {isoTimeFormat(item.time)}
            </div>
          ))}
        </div>

        {/* ================= SEATS ================= */}

        <div className="flex flex-col items-center">

          {/* ✅ FIXED HEADING VISIBILITY */}
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Select Your Seat
          </h1>

          {/* SCREEN */}
          <div className="w-[70%] h-10 border-t-[6px]
          border-primary rounded-[100%]" />

          <p className="text-gray-400 text-sm mt-2 mb-12">
            SCREEN SIDE
          </p>

          {/* A B */}
          <div className="mb-12">
            {renderRow("A")}
            {renderRow("B")}
          </div>

          {/* C D | E F */}
          <div className="flex gap-24 mb-12">
            <div>
              {renderRow("C")}
              {renderRow("D")}
            </div>

            <div>
              {renderRow("E")}
              {renderRow("F")}
            </div>
          </div>

          {/* G H | I J */}
          <div className="flex gap-24">
            <div>
              {renderRow("G")}
              {renderRow("H")}
            </div>

            <div>
              {renderRow("I")}
              {renderRow("J")}
            </div>
          </div>

          {/* CHECKOUT */}
          <button
            onClick={() => {

              if (!selectedTime)
                return toast("Select timing");

              if (!selectedSeats.length)
                return toast("Select seats");

              navigate("/my-bookings", {
                state: { seats: selectedSeats, time: selectedTime, showId: id, date }
              });
            }}
            className="
            mt-16
            px-14 py-4
            bg-primary
            rounded-full
            font-semibold
            flex items-center gap-3
            hover:scale-105
            transition
            shadow-xl shadow-primary/40
            "
          >
            Proceed to Checkout
            <ArrowRightIcon className="w-5 h-5"/>
          </button>

        </div>
      </div>
    </div>
  );
};

export default SeatLayout;