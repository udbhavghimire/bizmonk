"use server";
import { Resend } from "resend";
import swal from "sweetalert";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ content, title = null }) => {
  // Removed unused 'page' parameter
  const contentArray = [];

  // Add null check and type checking for content
  if (content && typeof content === "object") {
    for (const [key, value] of Object.entries(content)) {
      // Add null check for key and value
      if (key && value) {
        contentArray.push(`${capitalizeFirstLetter(key)}: ${value}`);
      }
    }
  }

  console.log("sending...");
  const { error } = await resend.emails.send({
    from: "info@bizmonk.ca",
    to: ["bizmonkcanada@gmail.com", "homes.milan@gmail.com"],
    subject: "Bizmonk Inquiry from Listing Page",
    html: `<h1>${
      title || "Bizmonk Inquiry from Listing Page"
    }</h1><br/><ul>${contentArray
      .map((val) => `<li>${val}</li>`)
      .join("")}</ul>`,
  });

  if (error) {
    swal("Message Failed", "Cannot send your message", "error");
  } else {
    swal(
      `Thank You, ${content?.name || ""}`,
      "Please expect an email or call from us shortly",
      "success" // Fixed capitalization of "success"
    );
  }
};
