if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");

  window.self.addEventListener("load", async () => {
    await navigator.serviceWorker
      .register("./service-worker.js", { scope: "/" })
      .then((registration) => {
        console.log("Service worker registered.");
        console.log("Registered at: " + registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker Error", error);
      });
  });
} else {
  console.warn("Push messaging is not supported");
}
