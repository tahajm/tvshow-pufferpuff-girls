import { DEFAULT_SHOW_ID } from "@/constants";
import { redirect } from "next/navigation";
export default async function Home() {
  redirect(`/shows/${DEFAULT_SHOW_ID}`);
}
