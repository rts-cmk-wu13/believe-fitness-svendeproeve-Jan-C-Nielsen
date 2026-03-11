import { addUserToActivity } from "@/lib/dal";

import { redirect } from "next/navigation";

export default async function tilmeld({ params }) {

    const activty_id = (await params).activity_id

    const aktiviteter = await addUserToActivity(activty_id);

    redirect('/profil')
}
