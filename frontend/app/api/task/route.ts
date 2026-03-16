import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionId, text } = await req.json();
    console.log(`👄 Signaling Wayne at session ${sessionId}`);

    const response = await fetch("https://api.heygen.com/v1/streaming.task", {
      method: "POST",
      headers: {
        "x-api-key": "3b98f0a0-19b3-4c1d-9e48-7594a2378d74", // Use your LiveAvatar key
        "content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: sessionId,
        text: text,
        task_type: "repeat" // This is the secret to forcing lips to move to Vapi's text
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Task failed" }, { status: 500 });
  }
}