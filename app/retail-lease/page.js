import { redirect } from "next/navigation";

// This is a server component
export default function RetailLeasePage() {
  // Redirect to a default city or homepage
  redirect("/toronto/retail-lease");
}

// If this is causing issues, you could move it to a separate file
// or remove it if not needed
// export async function generateStaticParams() {
//   return [];
// }
