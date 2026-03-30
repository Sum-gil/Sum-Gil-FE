import { initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type Messaging,
} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyClWunUQ5l34D5atOv3BpNaByDdlQeLcG0",
  authDomain: "sum-gil.firebaseapp.com",
  projectId: "sum-gil",
  storageBucket: "sum-gil.firebasestorage.app",
  messagingSenderId: "188670343046",
  appId: "1:188670343046:web:8a99a2ed27a9c255bdde07",
}

const app = initializeApp(firebaseConfig)

export async function getMessagingInstance(): Promise<Messaging | null> {
  if (typeof window === "undefined") return null

  const supported = await isSupported()
  if (!supported) {
    console.log("이 브라우저에서는 FCM Messaging 미지원")
    return null
  }

  return getMessaging(app)
}

export async function getFcmToken() {
  try {
    if (typeof window === "undefined") return null

    const messaging = await getMessagingInstance()
    if (!messaging) return null

    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
      console.log("알림 권한 거부됨")
      return null
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    )

    console.log("SW 등록:", registration)

    await navigator.serviceWorker.ready

    console.log("SW ready 완료")

    const token = await getToken(messaging, {
      vapidKey:
        "BG2Irt99dm49pwki1KD6lC7UaSLXqs1oMwMtkFrQoTow9DAkq7pFSXV3tfuArOEsMaHid_ygO5lTuofKBJQ96_M",
      serviceWorkerRegistration: registration,
    })

    console.log("FCM Token:", token)
    return token
  } catch (error) {
    console.error("FCM 토큰 에러", error)
    return null
  }
}

export async function subscribeForegroundMessage(
  callback: Parameters<typeof onMessage>[1]
) {
  const messaging = await getMessagingInstance()
  if (!messaging) return () => {}

  return onMessage(messaging, callback)
}