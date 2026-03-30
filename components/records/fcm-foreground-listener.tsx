"use client"

import { useEffect } from "react"
import { subscribeForegroundMessage } from "@/lib/fcm"

export function FcmForegroundListener() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const init = async () => {
      unsubscribe = await subscribeForegroundMessage((payload) => {
        console.log("포그라운드 메시지:", payload)

        const title = payload.notification?.title ?? "알림"
        const body = payload.notification?.body ?? ""

        if (Notification.permission === "granted") {
          new Notification(title, { body })
        } else {
          alert(`${title}\n${body}`)
        }
      })
    }

    init()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return null
}