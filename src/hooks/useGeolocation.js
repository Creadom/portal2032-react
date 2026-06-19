import { useState, useEffect } from 'react'

export default function useGeolocation() {
  const [country, setCountry] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | granted | denied | error

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      return
    }

    setStatus('loading')

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const code = data.address?.country_code?.toUpperCase()
          const name = data.address?.country
          setCountryCode(code ?? null)
          setCountry(name ?? null)
          setStatus('granted')
        } catch {
          setStatus('error')
        }
      },
      () => setStatus('denied')
    )
  }, [])

  const flag = countryCode
    ? String.fromCodePoint(
        ...[...countryCode].map(c => 0x1f1e6 + c.charCodeAt(0) - 65)
      )
    : null

  return { country, countryCode, flag, status }
}
