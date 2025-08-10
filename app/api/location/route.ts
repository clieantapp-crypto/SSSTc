import { NextResponse } from "next/server"

export async function GET() {
  const APIKEY = process.env.IPDATA_API_KEY || "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef" // Fallback for demonstration
  const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch from ipdata: ${response.statusText}`)
    }
    const country = await response.text()
    return NextResponse.json({ country })
  } catch (error) {
    console.error("Error in location API route:", error)
    return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 })
  }
}
