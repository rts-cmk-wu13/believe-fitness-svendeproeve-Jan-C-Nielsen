"use server"; //Skal stå på server acions

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { success } from "zod";


export async function GetAverageRating(id) {
    console.log("GetAverageRating");

    try {
        const url = "http://localhost:4000/api/v1/classes/" + id + "/ratings";
        const response = await fetch(url);

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {

            const res = await response.json();
            const ratetings = res.map((r) => (r.rating))
            if (ratetings.length > 0) {
                console.log("ratetings:", ratetings)
                let avgrateting = 0;
                for (let i = 0; i < ratetings.length; i++)
                    avgrateting += ratetings[i]
                avgrateting /= ratetings.length;
                return avgrateting;
            }
            else
                return 0;

        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error(" error:", error);

        return {
            success: false,
            message: "Fejl."
        };
    }
}



export async function GetTrainer(id) {
    console.log("GetTrainer");
    try {
        const url = "http://localhost:4000/api/v1/trainers/" + id
        const response = await fetch(url);

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error("tellAllToThePriest error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke hente vidnesbyrd"
        };
    }
}


export async function GetAsset(id) {
    console.log("GetAsset");

    try {
        const url = "http://localhost:4000/api/v1/assets/" + id
        const response = await fetch(url);

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error("tellAllToThePriest error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke hente vidnesbyrd"
        };
    }
}


export async function GetNews() {
    console.log("GetNews");

    try {
        const response = await fetch("http://localhost:4000/api/v1/news");

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error("tellAllToThePriest error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke hente vidnesbyrd"
        };
    }
}

export async function getTestimonials() {
    console.log("getTestimonials");

    try {
        const response = await fetch("http://localhost:4000/api/v1/testimonials");

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error("tellAllToThePriest error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke hente vidnesbyrd"
        };
    }
}



export async function getUser(id = null) {
    try {

        const cookieStore = await cookies();
        const accessTokenCookie = cookieStore.get("accessToken");
        id = (!id) ? cookieStore.get("userid")?.value : id;

        console.log("getUser(id):", id);

        if (!accessTokenCookie) {
            console.log("Access token cookie not found");
            return null;
            // redirect("/login");
        }

        console.log("Access token:", accessTokenCookie.value);

        const url = `http://localhost:4000/api/v1/users/${id}`;
        console.log("url:", url);
        const response = await fetch(
            url,
            {
                headers: {
                    Authorization: `Bearer ${accessTokenCookie.value}`
                }
                , cache: "no-store"
            }
        );

        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            const jsonres =  await response.json();
            console.log("jsonres------",jsonres)
            return jsonres;
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.log("getUser error:", error);
        return null
    }
}



export async function removeUserFromActivity(activity_id) {
    return addUserToActivity(activity_id, "DELETE")
}


export async function addUserToActivity(activity_id, met = "POST") {

    try {
        console.log("activity_id:", activity_id);

        const cookieStore = await cookies();
        const accessTokenCookie = cookieStore.get("accessToken");
        const user_id = cookieStore.get("userid");

        if (!accessTokenCookie || !user_id) {
            console.log("Access token/userid cookie not found");
            redirect("/login");
        }

        console.log("Access token:", accessTokenCookie.value);

        const url = `http://localhost:4000/api/v1/users/${user_id.value}/classes/${activity_id}`;
        console.log("url:", url);
        const response = await fetch(
            url,
            {
                method: met,
                headers: {
                    Authorization: `Bearer ${accessTokenCookie.value}`
                }
            }
        );

        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {

            return await response.json();
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.log("getUser error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke tilmelde"
        };
    }
}


export async function getAllClasses(searchStr = null) {
    console.log("getAllClasses");

    try {
        const user = await getUser();// det burde testes om user er logget ind
        const age = user ? user.age : 0;
        const role = user ? user.role : "default";
        console.log(role)
        const response = await fetch("http://localhost:4000/api/v1/classes");

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            let data = await response.json();

            if (searchStr) {
                searchStr = searchStr.trim().toLowerCase();
                data = data.filter((item) => (
                   item.className.toLowerCase().includes(searchStr) 
                || item.classDay.toLowerCase().includes(searchStr)
                || item.classDescription.toLowerCase().includes(searchStr)
                || item.trainer.trainerName.toLowerCase().includes(searchStr)))
            }
            return data;
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error("getAllActivities error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke hente getAllActivities"
        };
    }
}

export async function isUserRegistered(activity) {

    const cookieStore = await cookies();
    const user_id = cookieStore.get("userid");

    return user_id ? activity.users.find((u) => (u.id == user_id.value)) !== undefined : false;
}


export async function isUserInstructor() {

    const cookieStore = await cookies();
    const user_id = cookieStore.get("userid");
    const user = await getUser(user_id);
    return user.role === "instructor";
}


export async function getClass(id) {
    console.log("getClass:" + id);

    try {
        const url = "http://localhost:4000/api/v1/classes/" + id
        console.log("url:" + url);
        const response = await fetch(url, { cache: "no-store" });

        //Response.ok is false for 404.
        if (response.status === 404) {
            return notFound();
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        //Most servers return application/json; charset=utf-8
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        throw new Error("Response is not JSON");

    } catch (error) {
        console.error("getClass error:", error);

        return {
            success: false,
            message: "Fejl. Kunne ikke hente getClass"
        };
    }
}