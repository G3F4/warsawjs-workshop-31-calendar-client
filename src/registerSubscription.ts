const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

export default async function registerSubscription(
  register: ServiceWorkerRegistration,
  options?: { silent: boolean },
) {
  try {
    const data = await register.pushManager.subscribe({
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      userVisibleOnly: true,
    });

    await fetch(`/notifications`, {
      body: JSON.stringify({
        data,
        options,
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

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")// eslint-disable-line no-useless-escape
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
