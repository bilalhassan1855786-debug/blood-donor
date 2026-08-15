"use client";

import { isEligibleForDonation } from "@/lib/donor";
import { useState } from "react";

export default function DonorCard({ donor }: any) {
  const [data] = useState(donor);

  return (
    <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-lg md:rounded-xl shadow">

      <h2 className="text-lg sm:text-lg md:text-xl font-bold">{data.fullName}</h2>

      <div className="inline-block bg-red-600 text-white px-2 sm:px-3 md:px-3 py-0.5 sm:py-1 md:py-1 rounded-full text-xs sm:text-sm my-1 sm:my-1.5 md:my-2">
        {data.bloodGroup}
      </div>

      <p className="text-xs sm:text-sm"><b>City:</b> {data.city}</p>
      <p className="text-xs sm:text-sm"><b>Address:</b> {data.address}</p>
      <p className="text-xs sm:text-sm"><b>Phone:</b> {data.whatsappNumber}</p>

      <div className="mt-1 sm:mt-1.5 md:mt-2">
        {isEligibleForDonation(data.lastDonationDate) ? (
          <span className="text-green-600 font-bold text-xs sm:text-sm">Eligible</span>
        ) : (
          <span className="text-red-600 font-bold text-xs sm:text-sm">Not Eligible</span>
        )}
      </div>
      

      <a
        href={`https://wa.me/${data.whatsappNumber}`}
        target="_blank"
        className="mt-2 sm:mt-2.5 md:mt-3 inline-block bg-green-600 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2 rounded-lg sm:rounded-lg md:rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-700 transition"
      >
        WhatsApp
      </a>

    </div>
  );
}