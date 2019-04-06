import ENV from "./env";

const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
// @ts-ignore
const URL = ENV.API_URL;

export default async function registerSubscription(
  register: ServiceWorkerRegistration,
) {
  try {
    const data = await register.pushManager.subscribe({
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      userVisibleOnly: true,
    });

    // @ts-ignore
    await fetch(`${URL}/notifications`, {
      body: JSON.stringify({
        data,
      }),
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (e) {
    throw new Error(`cannot register subscription | ${e}`);
  }
}

function urlBase64ToUint8Array(base64String: any) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
