"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || ""
  );

  const [city, setCity] = useState(
    searchParams.get("city") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (bloodGroup)
      params.set("bloodGroup", bloodGroup);

    if (city.trim())
      params.set("city", city.trim());

    router.push(`/donors?${params.toString()}`);
  };

  const handleReset = () => {
    setBloodGroup("");
    setCity("");
    router.push("/donors");
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl md:rounded-3xl shadow-lg p-3 sm:p-4 md:p-6">

      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
        <div className="text-lg sm:text-2xl">🔍</div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-red-600">
            Blood Availability Search
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm">
            Search blood availability by city and blood group
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">

        {/* Blood Group */}
        <div>
          <label className="block mb-1 sm:mb-2 font-semibold text-gray-700 text-xs sm:text-sm">
            Blood Group
          </label>

          <select
            value={bloodGroup}
            onChange={(e) =>
              setBloodGroup(e.target.value)
            }
            className="
            w-full
            h-10 sm:h-11 md:h-12
            px-2 sm:px-3 md:px-4
            rounded-lg sm:rounded-lg md:rounded-xl
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-red-500"
          >
            <option value="">
              All Blood Groups
            </option>

            {BLOOD_GROUPS.map((bg) => (
              <option
                key={bg}
                value={bg}
              >
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 sm:mb-2 font-semibold text-gray-700 text-xs sm:text-sm">
            City
          </label>

          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSearch()
            }
            className="
            w-full
            h-10 sm:h-11 md:h-12
            px-2 sm:px-3 md:px-4
            rounded-lg sm:rounded-lg md:rounded-xl
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-red-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2 sm:gap-2.5 md:gap-3">

          <button
            onClick={handleSearch}
            className="
            flex-1
            h-10 sm:h-11 md:h-12
            bg-red-600
            text-white
            rounded-lg sm:rounded-lg md:rounded-xl
            font-semibold
            text-xs sm:text-sm
            hover:bg-red-700
            hover:scale-105
            transition-all"
          >
            Search
          </button>

          {(bloodGroup || city) && (
            <button
              onClick={handleReset}
              className="
              h-10 sm:h-11 md:h-12
              px-3 sm:px-4 md:px-5
              border-2
              border-red-600
              text-red-600
              rounded-lg sm:rounded-lg md:rounded-xl
              font-semibold
              text-xs sm:text-sm
              hover:bg-red-50
              transition-all"
            >
              Clear
            </button>
          )}

        </div>
      </div>

      {/* Active Filters */}
      {(bloodGroup || city) && (
        <div className="mt-3 sm:mt-4 md:mt-6">

          <div className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
            Active Filters
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">

            {bloodGroup && (
              <div className="
                bg-red-100
                text-red-700
                px-2 sm:px-3 md:px-4
                py-1 sm:py-1.5 md:py-2
                rounded-full
                font-semibold
                text-xs sm:text-sm
              ">
                🩸 {bloodGroup}
              </div>
            )}

            {city && (
              <div className="
                bg-blue-100
                text-blue-700
                px-4
                py-2
                rounded-full
                font-semibold
              ">
                📍 {city}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}