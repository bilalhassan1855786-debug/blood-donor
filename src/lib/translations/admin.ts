import { Lang } from "./index";

export const adminTranslations: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    admin_panel: "Admin Panel",

    // Sidebar
    sidebar_dashboard: "Dashboard",
    sidebar_users: "Users",
    sidebar_manage_donors: "Manage Donors",
    sidebar_manage_users: "Manage Users",
    sidebar_blood_requests: "Blood Requests",
    sidebar_add_donor: "Add Donor",
    sidebar_messages: "Messages",
    sidebar_back_website: "Back Website",

    // Dashboard
    dashboard_title: "Admin Dashboard",
    stat_users: "Users",
    stat_donors: "Donors",
    stat_requests: "Requests",
    stat_pending: "Pending",
    stat_approved: "Approved",
    recent_blood_requests: "Recent Blood Requests",
    recent_donors: "Recent Donors",

    // User Management
    user_management_title: "User Management",
    search_user_placeholder: "Search User...",
    role_label: "Role",
    role_user: "user",
    role_admin: "admin",
    role_superadmin: "superadmin",
    role_developer: "developer",
    profile_btn: "Profile",
    make_admin_btn: "Make Admin",
    remove_btn: "Remove",

    // Donor Management
    donor_management_title: "Donor Management",
    donor_management_desc: "Manage donor requests",
    add_donor_btn: "+ Add Donor",
    search_donor_placeholder: "Search donor...",
    filter_pending: "pending",
    filter_approved: "approved",
    filter_rejected: "rejected",
    total_label: "Total",
    health_label: "Health",
    health_passed: "Passed",
    approve_btn: "Approve",
    reject_btn: "Reject",

    // Blood Requests Management
    blood_requests_management_title: "Blood Requests Management",
    blood_requests_management_desc: "Manage patient blood requests",
    filter_cancelled: "Cancelled",
    no_requests_found: "No blood requests found",

    // Add Donor Form
    add_donor_title: "Add Donor",
    add_donor_submit: "Add Donor",

    // Messages
    contact_messages_title: "Contact Messages",
    read_btn: "read",
    contact_number_label: "Contact Number",
    subject_label: "Subject",
    message_label: "Message",
    your_name_placeholder: "Your Name",
    send_message_btn: "Send Message",
  },

  ur: {
    admin_panel: "ایڈمن پینل",

    sidebar_dashboard: "ڈیش بورڈ",
    sidebar_users: "صارفین",
    sidebar_manage_donors: "ڈونرز کا انتظام",
    sidebar_manage_users: "صارفین کا انتظام",
    sidebar_blood_requests: "خون کی درخواستیں",
    sidebar_add_donor: "ڈونر شامل کریں",
    sidebar_messages: "پیغامات",
    sidebar_back_website: "ویب سائٹ پر واپس",

    dashboard_title: "ایڈمن ڈیش بورڈ",
    stat_users: "صارفین",
    stat_donors: "ڈونرز",
    stat_requests: "درخواستیں",
    stat_pending: "زیرِ التوا",
    stat_approved: "منظور شدہ",
    recent_blood_requests: "حالیہ خون کی درخواستیں",
    recent_donors: "حالیہ ڈونرز",

    user_management_title: "صارفین کا انتظام",
    search_user_placeholder: "صارف تلاش کریں...",
    role_label: "کردار",
    role_user: "صارف",
    role_admin: "ایڈمن",
    role_superadmin: "سپر ایڈمن",
    role_developer: "ڈویلپر",
    profile_btn: "پروفائل",
    make_admin_btn: "ایڈمن بنائیں",
    remove_btn: "ہٹائیں",

    donor_management_title: "ڈونر کا انتظام",
    donor_management_desc: "ڈونر درخواستوں کا انتظام کریں",
    add_donor_btn: "+ ڈونر شامل کریں",
    search_donor_placeholder: "ڈونر تلاش کریں...",
    filter_pending: "زیرِ التوا",
    filter_approved: "منظور شدہ",
    filter_rejected: "مسترد",
    total_label: "کل",
    health_label: "صحت",
    health_passed: "پاس",
    approve_btn: "منظور کریں",
    reject_btn: "مسترد کریں",

    blood_requests_management_title: "خون کی درخواستوں کا انتظام",
    blood_requests_management_desc: "مریضوں کی خون کی درخواستوں کا انتظام کریں",
    filter_cancelled: "منسوخ",
    no_requests_found: "کوئی خون کی درخواست نہیں ملی",

    add_donor_title: "ڈونر شامل کریں",
    add_donor_submit: "ڈونر شامل کریں",

    contact_messages_title: "رابطہ پیغامات",
    read_btn: "پڑھا گیا",
    contact_number_label: "رابطہ نمبر",
    subject_label: "موضوع",
    message_label: "پیغام",
    your_name_placeholder: "آپ کا نام",
    send_message_btn: "پیغام بھیجیں",
  },

  roman: {
    admin_panel: "Admin Panel",

    sidebar_dashboard: "Dashboard",
    sidebar_users: "Users",
    sidebar_manage_donors: "Donors Manage Karein",
    sidebar_manage_users: "Users Manage Karein",
    sidebar_blood_requests: "Blood Requests",
    sidebar_add_donor: "Donor Add Karein",
    sidebar_messages: "Messages",
    sidebar_back_website: "Website Par Wapas",

    dashboard_title: "Admin Dashboard",
    stat_users: "Users",
    stat_donors: "Donors",
    stat_requests: "Requests",
    stat_pending: "Pending",
    stat_approved: "Approved",
    recent_blood_requests: "Recent Blood Requests",
    recent_donors: "Recent Donors",

    user_management_title: "User Management",
    search_user_placeholder: "User Talash Karein...",
    role_label: "Role",
    role_user: "user",
    role_admin: "admin",
    role_superadmin: "superadmin",
    role_developer: "developer",
    profile_btn: "Profile",
    make_admin_btn: "Admin Banayein",
    remove_btn: "Remove Karein",

    donor_management_title: "Donor Management",
    donor_management_desc: "Donor requests manage karein",
    add_donor_btn: "+ Donor Add Karein",
    search_donor_placeholder: "Donor Talash Karein...",
    filter_pending: "pending",
    filter_approved: "approved",
    filter_rejected: "rejected",
    total_label: "Total",
    health_label: "Health",
    health_passed: "Pass",
    approve_btn: "Approve Karein",
    reject_btn: "Reject Karein",

    blood_requests_management_title: "Blood Requests Management",
    blood_requests_management_desc: "Patient blood requests manage karein",
    filter_cancelled: "Cancel",
    no_requests_found: "Koi blood request nahi mili",

    add_donor_title: "Donor Add Karein",
    add_donor_submit: "Donor Add Karein",

    contact_messages_title: "Contact Messages",
    read_btn: "read",
    contact_number_label: "Contact Number",
    subject_label: "Subject",
    message_label: "Message",
    your_name_placeholder: "Aapka Naam",
    send_message_btn: "Message Bhejein",
  },
};