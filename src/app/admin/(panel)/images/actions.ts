"use server";

import { revalidatePath } from "next/cache";

// Called after an image upload or reset: refreshes every page right away,
// on Vercel and in the visitor's browser
export async function refreshImagePages() {
  revalidatePath("/", "layout");
}