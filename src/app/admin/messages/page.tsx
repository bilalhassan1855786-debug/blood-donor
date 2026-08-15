"use client";

import { useEffect, useState } from "react";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

export default function MessagesPage() {
  const [messages, setMessages] =
    useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await safeFetch(
        "/api/admin/messages"
      );

      const data = await res.json();

      setMessages(data.messages || []);
      setOffline(false);
    } catch (err) {
      setOffline(isOfflineError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markRead = async (id: string) => {
    try {
      await safeFetch(
        "/api/admin/message-status",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      loadMessages();
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const deleteMessage = async (
    id: string
  ) => {
    const confirmDelete =
      confirm("Delete message?");

    if (!confirmDelete) return;

    try {
      await safeFetch(
        "/api/admin/delete-message",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      loadMessages();
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-8">

      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
        Contact Messages
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 py-8 sm:py-16 md:py-10">Loading...</p>
      ) : offline ? (
        <OfflineCard onRetry={loadMessages} />
      ) : (
      <div className="grid gap-2 sm:gap-3 md:gap-4">

        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-white shadow rounded-lg sm:rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 border"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-2 sm:gap-3">

              <div>
                <h2 className="font-bold text-lg sm:text-lg md:text-lg">
                  {m.fullName}
                </h2>

                <p>{m.phone}</p>

                <p>{m.email}</p>

                <p className="font-medium mt-1 sm:mt-2">
                  {m.subject}
                </p>

                <p className="text-gray-600 mt-1">
                  {m.message}
                </p>
              </div>

              <div className="space-y-1 sm:space-y-2">

                <span
                  className={`block px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-white text-center text-xs sm:text-sm ${
                    m.status === "read"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {m.status}
                </span>

                {m.status === "unread" && (
                  <button
                    onClick={() =>
                      markRead(m._id)
                    }
                    className="bg-blue-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg w-full text-sm"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteMessage(m._id)
                  }
                  className="bg-red-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg w-full text-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
      )}

    </div>
  );
}