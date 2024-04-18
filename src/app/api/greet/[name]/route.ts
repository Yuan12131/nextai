import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const greeting = `Hello, ${name || "stranger"}!`;

  return NextResponse.json({ greeting }, { status: 200 });
}
