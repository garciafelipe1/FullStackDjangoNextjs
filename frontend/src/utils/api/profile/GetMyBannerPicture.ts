import { ToastError } from "@/components/toast/toast";

export default async function fetchMybannerPicture() {
  try {
    const res = await fetch('/api/profile/get_banner_picture');
    console.log(res)
    const data = await res.json();
    return data;

  } catch (err) {
    ToastError('Error fetching banner picture picture');
    return null;
  }
}