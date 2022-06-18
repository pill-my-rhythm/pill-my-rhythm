if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");

  window.self.addEventListener("load", async () => {
    await navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Service Worker Error", error);
    });
  });
} else {
  console.warn("Push messaging is not supported");
}
