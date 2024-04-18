import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { name } = req.query;
  const greeting = `Hello, ${name || 'stranger'}!`;

    return NextResponse.json({ greeting }, { status: 200 });
  }
