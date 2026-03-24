let kakaoMapLoadingPromise: Promise<any> | null = null

export function loadKakaoMapScript(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("브라우저 환경이 아닙니다."))
  }

  if (window.kakao?.maps) {
    return new Promise((resolve) => {
      window.kakao.maps.load(() => resolve(window.kakao))
    })
  }

  if (kakaoMapLoadingPromise) {
    return kakaoMapLoadingPromise
  }

  kakaoMapLoadingPromise = new Promise((resolve, reject) => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APPKEY

    if (!appKey) {
      reject(new Error("NEXT_PUBLIC_KAKAO_MAP_APPKEY가 설정되지 않았습니다."))
      return
    }

    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
    ) as HTMLScriptElement | null

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.kakao.maps.load(() => resolve(window.kakao))
      })
      return
    }

    const script = document.createElement("script")
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(() => resolve(window.kakao))
    }

    script.onerror = () => {
      reject(new Error("카카오맵 스크립트 로드에 실패했습니다."))
    }

    document.head.appendChild(script)
  })

  return kakaoMapLoadingPromise
}