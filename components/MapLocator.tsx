"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  })
}

interface MapLocatorProps {
  lat: number
  lng: number
  name: string
  address: string
  className?: string
}

function LocationMarker({ lat, lng, name, address }: { lat: number; lng: number; name: string; address: string }) {
  const map = useMap()
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    map.setView([lat, lng], 15)
  }, [map, lat, lng])

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setUserLocation([userLat, userLng])
          map.setView([userLat, userLng], 15)
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  }

  return (
    <>
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="p-2">
            <h3 className="font-semibold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{address}</p>
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </Popup>
      </Marker>
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>
            <div className="p-2">
              <p className="text-sm">Your Location</p>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  )
}

export function MapLocator({ lat, lng, name, address, className = "" }: MapLocatorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`aspect-video bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return (
    <div className={`aspect-video rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker lat={lat} lng={lng} name={name} address={address} />
      </MapContainer>
    </div>
  )
}


