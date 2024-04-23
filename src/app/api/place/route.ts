import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
) {
  const placeName = await req.text();

  if (!placeName) {
    return NextResponse.json(`placeName이 없습니다.`, { status: 400 });
  }

  const fields = ["photos", "formatted_address", "name", "rating"].join(",");
  const apiKey = process.env.NEXT_PUBLIC_PLACE_API_KEY;

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&language=ko&key=${apiKey}
`;
    const searchApiResponse = await fetch(apiUrl);
    const searchData = await searchApiResponse.json();

    const placeIds = searchData.candidates.map(
      (candidate: { place_id: any }) => candidate.place_id
    );

    const placeDetailsPromises = placeIds.map(async (placeId: any) => {
      const detailsApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=${fields}&language=ko&key=${apiKey}
      `;
      const detailsApiResponse = await fetch(detailsApiUrl);
      return detailsApiResponse.json();
    });
    
    const placeDetails = await Promise.all(placeDetailsPromises);
    return NextResponse.json(placeDetails, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "데이터 가져오기 실패" }, { status: 500 });
  }
}
