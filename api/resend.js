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

  // console.log("sending...");
  // console.log(contentArray)
  // console.log(
  //   `</h1><br/><ul>${contentArray
  //     .map((val) => `<li>${val}</li>`)
  //     .join("\n")}</ul>`
  // );
  const { error } = await resend.emails.send({
    from: "info@homebaba.ca",
    to: ["info@bizmonk.ca"],
    subject: "Bizmonk Inquiry",
    html: `<h1>${title || "Bizmonk Inquiry"}</h1><br/><ul>${contentArray
      .map((val) => `<li>${val}</li>`)
      .join("\n")}</ul>`,
  });

  if (error) {
    swal("Message Failed", "Cannot send your message", "error");
  } else {
    return true;
    swal(
      `Thank You, ${content?.name || ""}`,
      "Please expect an email or call from us shortly",
      "success" // Fixed capitalization of "success"
    );
  }
};
