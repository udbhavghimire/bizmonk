"use server";
import { Resend } from "resend";
import swal from "sweetalert";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ content, page = null, title = null }) => {
  const contentArray = [];

  for (const [key, value] of Object.entries(content)) {
    contentArray.push(`${capitalizeFirstLetter(key)} : ${value}`);
  }
  console.log("sending...");
  const { data, error } = await resend.emails.send({
    from: "info@bizmonk.ca",
    to: ["vishaldhakal96@gmail.com"],
    subject: `Inquiry in Bizmonk`,
    html: `<h1>${title || `Inquiry from Bizmonk`}</h1><br/><ul>${contentArray
      .map((val) => `<li>${val}</li>`)
      .join("")}</ul>`,
  });
  if (error) {
    swal("Message Failed", "Cannot send your message", "error");
  } else {
    swal(
      `Thank You, ${content?.name || ""}`,
      "Please expect an email or call from us shortly",
      "Success"
    );
  }
};
