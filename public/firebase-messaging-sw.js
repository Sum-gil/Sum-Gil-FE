importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyClWunUQ5l34D5atOv3BpNaByDdlQeLcG0",
  authDomain: "sum-gil.firebaseapp.com",
  projectId: "sum-gil",
  messagingSenderId: "188670343046",
  appId: "1:188670343046:web:8a99a2ed27a9c255bdde07",
})

const messaging = firebase.messaging()


messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드 메시지:", payload)

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192.png",
  })
})