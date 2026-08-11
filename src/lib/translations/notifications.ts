import { Lang } from "./index";

export const notificationTranslations: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    notifications: "Notifications",
    no_notifications: "No notifications",
    view_all: "View All",
    mark_all_read: "Mark all as read",
    loading: "Loading...",
    new: "New",

    donor_request: "New donor request",
    donor_approved: "Your donor profile was approved",
    donor_rejected: "Your donor profile was rejected",

    blood_request: "New blood request",
    emergency_request: "Emergency blood request",

    donation_completed: "Donation completed",
    achievement: "Achievement unlocked",

    announcement: "Announcement",
    system: "System notification",
  },

  ur: {
    notifications: "نوٹیفکیشنز",
    no_notifications: "کوئی نوٹیفکیشن نہیں",
    view_all: "تمام دیکھیں",
    mark_all_read: "سب کو پڑھا ہوا نشان زد کریں",
    loading: "لوڈ ہو رہا ہے...",
    new: "نیا",

    donor_request: "نئی ڈونر درخواست",
    donor_approved: "آپ کی ڈونر پروفائل منظور ہوگئی",
    donor_rejected: "آپ کی ڈونر پروفائل مسترد ہوگئی",

    blood_request: "نئی خون کی درخواست",
    emergency_request: "ایمرجنسی خون کی درخواست",

    donation_completed: "خون عطیہ مکمل",
    achievement: "نیا اعزاز حاصل ہوا",

    announcement: "اعلان",
    system: "سسٹم نوٹیفکیشن",
  },

  roman: {
    notifications: "Notifications",
    no_notifications: "Koi notification nahi",
    view_all: "Sab dekhein",
    mark_all_read: "Sab ko parha hua mark karein",
    loading: "Load ho raha hai...",
    new: "Naya",

    donor_request: "Nayi donor request",
    donor_approved: "Aap ka donor profile approve ho gaya",
    donor_rejected: "Aap ka donor profile reject ho gaya",

    blood_request: "Nayi blood request",
    emergency_request: "Emergency blood request",

    donation_completed: "Donation complete",
    achievement: "Achievement mil gayi",

    announcement: "Announcement",
    system: "System notification",
  },
};