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
    <div className="p-4 md:p-8">

      <h1 className="text-3xl font-bold mb-6">
        Contact Messages
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      ) : offline ? (
        <OfflineCard onRetry={loadMessages} />
      ) : (
      <div className="grid gap-4">

        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-white shadow rounded-xl p-5 border"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-3">

              <div>
                <h2 className="font-bold text-lg">
                  {m.fullName}
                </h2>

                <p>{m.phone}</p>

                <p>{m.email}</p>

                <p className="font-medium mt-2">
                  {m.subject}
                </p>

                <p className="text-gray-600 mt-1">
                  {m.message}
                </p>
              </div>

              <div className="space-y-2">

                <span
                  className={`block px-3 py-1 rounded text-white text-center ${
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
                    className="bg-blue-600 text-white px-3 py-2 rounded w-full"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteMessage(m._id)
                  }
                  className="bg-red-600 text-white px-3 py-2 rounded w-full"
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