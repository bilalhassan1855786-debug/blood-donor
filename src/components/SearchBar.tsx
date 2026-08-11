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
    <div className="bg-white rounded-3xl shadow-lg p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">🔍</div>

        <div>
          <h2 className="text-xl font-bold text-red-600">
            Blood Availability Search
          </h2>

          <p className="text-gray-500 text-sm">
            Search blood availability by city and blood group
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* Blood Group */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Blood Group
          </label>

          <select
            value={bloodGroup}
            onChange={(e) =>
              setBloodGroup(e.target.value)
            }
            className="
            w-full
            h-12
            px-4
            rounded-xl
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
          <label className="block mb-2 font-semibold text-gray-700">
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
            h-12
            px-4
            rounded-xl
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-red-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-3">

          <button
            onClick={handleSearch}
            className="
            flex-1
            h-12
            bg-red-600
            text-white
            rounded-xl
            font-semibold
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
              h-12
              px-5
              border-2
              border-red-600
              text-red-600
              rounded-xl
              font-semibold
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
        <div className="mt-6">

          <div className="text-sm text-gray-500 mb-2">
            Active Filters
          </div>

          <div className="flex flex-wrap gap-3">

            {bloodGroup && (
              <div className="
                bg-red-100
                text-red-700
                px-4
                py-2
                rounded-full
                font-semibold
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