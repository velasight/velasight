import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("⏳ [Backend] Requesting LITE Mode Session...");
    
    const tokenRes = await fetch("https://api.liveavatar.com/v1/sessions/token", {
      method: "POST",
      headers: {
        "x-api-key": "3b98f0a0-19b3-4c1d-9e48-7594a2378d74",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        mode: "LITE",
        avatar_id: "dd73ea75-1218-4ef3-92ce-606d5f7fbc0a"
      })
    });
    
    const tokenData = await tokenRes.json();
    const sessionToken = tokenData.data?.session_token;

    if (!sessionToken) return NextResponse.json({ error: "No token" }, { status: 400 });

    const startRes = await fetch("https://api.liveavatar.com/v1/sessions/start", {
      method: "POST",
      headers: {
        "authorization": `Bearer ${sessionToken}`,
        "content-type": "application/json"
      }
    });

    const startDataRaw = await startRes.json();
    return NextResponse.json(startDataRaw.data);
    
  } catch (error) {
    console.error("🚨 Route Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}