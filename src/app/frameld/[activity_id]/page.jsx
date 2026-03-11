import { addUserToActivity, removeUserFromActivity } from "@/lib/dal";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export default async function frameld({ params }) {

    const activty_id = (await params).activity_id

    const aktiviteter = await removeUserFromActivity(activty_id);

    redirect('/profil')
}
