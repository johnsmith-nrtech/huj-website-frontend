import { redirect } from "next/navigation";

// /admin always lands on the dashboard (the panel sends you to the login page if you're logged out)
export default function AdminIndex() {
  redirect("/admin/dashboard");
}