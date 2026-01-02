import { redirect } from "next/navigation";

/**
 * Root route is not meant to render UI.
 * Always redirect to the login page.
 */
export default function HomePage() {
  redirect("/login");
}
