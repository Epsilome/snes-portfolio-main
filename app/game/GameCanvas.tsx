import React, { useEffect, useState } from "react"

const GameCanvas: React.FC = () => {
  const [engineLoaded, setEngineLoaded] = useState(false)

  useEffect(() => {
    // Dynamically load the Godot Engine script
    const script = document.createElement("script")
    script.src = "/First Game.js" // Path to file in the public folder
    script.onload = () => {
      if (window.Engine) {
        setEngineLoaded(true)
      } else {
        console.error("Engine not found after loading script.")
      }
    }
    script.onerror = () => {
      console.error("Failed to load the Godot engine script.")
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script) // Cleanup the script on component unmount
    }
  }, [])

  useEffect(() => {
    if (!engineLoaded) return

    const GODOT_CONFIG = {
      args: [],
      canvasResizePolicy: 2,
      ensureCrossOriginIsolationHeaders: true,
      executable: "First Game",
      experimentalVK: false,
      fileSizes: { "First Game.pck": 1791936, "First Game.wasm": 1620216 },
      focusCanvas: true,
      gdextensionLibs: [],
      serviceWorker: true,
    }
    const GODOT_THREADS_ENABLED = false
    const engine = new Engine(GODOT_CONFIG)

    const statusOverlay = document.getElementById("status")
    const statusProgress = document.getElementById("status-progress") as HTMLProgressElement
    const statusNotice = document.getElementById("status-notice")

    let initializing = true
    let statusMode = ""

    function setStatusMode(mode: string) {
      if (statusMode === mode || !initializing) {
        return
      }
      if (mode === "hidden") {
        statusOverlay!.remove()
        initializing = false
        return
      }
      statusOverlay!.style.visibility = "visible"
      statusProgress!.style.display = mode === "progress" ? "block" : "none"
      statusNotice!.style.display = mode === "notice" ? "block" : "none"
      statusMode = mode
    }

    function setStatusNotice(text: string) {
      while (statusNotice!.lastChild) {
        statusNotice!.removeChild(statusNotice!.lastChild)
      }
      const lines = text.split("\n")
      lines.forEach((line: string) => {
        statusNotice!.appendChild(document.createTextNode(line))
        statusNotice!.appendChild(document.createElement("br"))
      })
    }

    function displayFailureNotice(err: any) {
      console.error(err)
      if (err instanceof Error) {
        setStatusNotice(err.message)
      } else if (typeof err === "string") {
        setStatusNotice(err)
      } else {
        setStatusNotice("An unknown error occurred")
      }
      setStatusMode("notice")
      initializing = false
    }

    const missing = Engine.getMissingFeatures({
      threads: GODOT_THREADS_ENABLED,
    })

    if (missing.length !== 0) {
      if (
        GODOT_CONFIG.serviceWorker &&
        GODOT_CONFIG.ensureCrossOriginIsolationHeaders &&
        "serviceWorker" in navigator
      ) {
        Promise.race([
          navigator.serviceWorker
            .getRegistration()
            .then((registration) => {
              if (registration != null) {
                return Promise.reject(new Error("Service worker already exists."))
              }
              return registration
            })
            .then(() => engine.installServiceWorker()),
          new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 2000)
          }),
        ])
          .catch((err) => {
            console.error("Error while registering service worker:", err)
          })
          .then(() => {
            window.location.reload()
          })
      } else {
        const missingMsg = "Error\nThe following features required to run Godot projects on the Web are missing:\n"
        displayFailureNotice(missingMsg + missing.join("\n"))
      }
    } else {
      setStatusMode("progress")
      engine
        .startGame({
          onProgress: function (current: number, total: number) {
            if (current > 0 && total > 0) {
              statusProgress.value = current
              statusProgress.max = total
            } else {
              statusProgress.removeAttribute("value")
              statusProgress.removeAttribute("max")
            }
          },
        })
        .then(() => {
          setStatusMode("hidden")
        }, displayFailureNotice)
    }
  }, [engineLoaded])

  return (
    <>
      <canvas id="canvas">Your browser does not support the canvas tag.</canvas>
      <noscript>Your browser does not support JavaScript.</noscript>
      <div id="status">
        <img id="status-splash" src="First Game.png" alt="" />
        <progress id="status-progress"></progress>
        <div id="status-notice"></div>
      </div>
    </>
  )
}

export default GameCanvas
