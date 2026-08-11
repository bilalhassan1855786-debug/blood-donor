"use client";

import { isEligibleForDonation } from "@/lib/donor";
import { useState } from "react";

export default function DonorCard({ donor }: any) {
  const [data] = useState(donor);

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold">{data.fullName}</h2>

      <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm my-2">
        {data.bloodGroup}
      </div>

      <p><b>City:</b> {data.city}</p>
      <p><b>Address:</b> {data.address}</p>
      <p><b>Phone:</b> {data.whatsappNumber}</p>

      <div className="mt-2">
        {isEligibleForDonation(data.lastDonationDate) ? (
          <span className="text-green-600 font-bold">Eligible</span>
        ) : (
          <span className="text-red-600 font-bold">Not Eligible</span>
        )}
      </div>
      

      <a
        href={`https://wa.me/${data.whatsappNumber}`}
        target="_blank"
        className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded"
      >
        WhatsApp
      </a>

    </div>
  );
}