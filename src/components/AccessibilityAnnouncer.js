"use client"

import { useEffect, useState } from "react"
import "../styles/components.css"

function AccessibilityAnnouncer({ message, priority = "polite" }) {
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    if (message) {
      setAnnouncement(message)
      const timer = setTimeout(() => setAnnouncement(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="sr-only" aria-live={priority} aria-atomic="true" role="status">
      {announcement}
    </div>
  )
}

export default AccessibilityAnnouncer
