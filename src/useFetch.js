import React, { useState } from 'react'

export default function useFetch({ url, payload }) {
  const [data, setData] = useState({})
  try {
    ;(async function apiCall(url, payload) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      setData(data)
    })()
  } catch (error) {
    setData(error)
  }
  return data
}
