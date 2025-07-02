self.addEventListener("push", (event) => {
  const text = event.data.text();
  event.waitUntil(
    self.registration.showNotification("Web Push!", {
      body: text,
      data: {
        url: "https://task-force.seheon.kr",
      },
    }),
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
