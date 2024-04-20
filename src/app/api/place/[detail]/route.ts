import { NextRequest, NextResponse } from "next/server";

export default async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const placeName = params.name;
}
