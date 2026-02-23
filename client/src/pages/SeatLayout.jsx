/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import isoTimeFormat from "../lib/isoTimeFormat";
import { ClockIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const SeatLayout = () => {

  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  // ✅ Fetch Show
  const getShow = () => {

    const foundShow = dummyShowsData.find(
      (item) => item._id === id
    );

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  // ✅ Load show when id changes
  useEffect(() => {
    getShow();
  }, [id]);

  // ✅ Loading State
  if (!show) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">

      {/* ================= TIMINGS ================= */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">

        <p className="text-lg font-semibold px-6">
          Available Timings
        </p>

        <div className="mt-5 space-y-2">

          {(show?.dateTime?.[date] || []).map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition
              ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">
                {isoTimeFormat(item.time)}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* ================= SEAT LAYOUT ================= */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">

        {/* Blur Effects */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4">
          Select your Seat
        </h1>

        <img
          src={assets.screenImage}
          alt="screen"
          className="mb-2"
        />

        <p className="text-gray-400 text-sm mb-6">
          SCREEN SIDE
        </p>

        {/* ✅ TEMP SEAT PLACEHOLDER */}
        <div className="grid grid-cols-8 gap-3 mt-6">
          {Array.from({ length: 40 }).map((_, index) => {

            const seat = index + 1;

            return (
              <button
                key={seat}
                onClick={() =>
                  setSelectedSeats((prev) =>
                    prev.includes(seat)
                      ? prev.filter((s) => s !== seat)
                      : [...prev, seat]
                  )
                }
                className={`w-10 h-10 rounded border transition
                ${
                  selectedSeats.includes(seat)
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20"
                }`}
              >
                {seat}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SeatLayout;