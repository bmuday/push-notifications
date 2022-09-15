const button = document.querySelector("button");

button.addEventListener("click", () => {
  // only run this ask for permission after some user interaction
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      const notification1 = new Notification("Example notification", {
        body: Math.random(),
        data: { hello: "world" },
        icon: "logo.png",
        tag: "Test Notification",
      });

      notification1.addEventListener("error", (e) => {
        alert("error");
      });

      notification1.addEventListener("close", (e) => {
        console.log(e);
      });
    }
  });
});

let notification2;
let interval;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification2 = new Notification("Example notification", {
        body: `You have been gone for ${Math.round(
          (new Date() - leaveDate) / 1000
        )} seconds`,
        tag: "Come back",
      });
    }, 1000);
  } else {
    if (interval) clearInterval(interval);
    if (notification2) notification2.close();
  }
});
