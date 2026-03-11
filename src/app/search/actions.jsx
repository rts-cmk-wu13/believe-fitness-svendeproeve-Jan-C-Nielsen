
import { redirect } from "next/navigation.js";

export async function saveMessage(formData) {
    "use server"
  const msg = formData.get("message");
  console.log("Besked modtaget:", msg);

const encodedMsg = encodeURIComponent(msg);

  redirect(`/aktiviteter?searchstr=${encodedMsg}`);
}
