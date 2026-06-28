import { NextResponse } from "next/server";
import packageJson from "../../../../package.json";
import { lookupCompany } from "@/lib/company-lookup";

export async function POST(request: Request) {
  const apiKey =
    process.env.ORANGESLICE_API_KEY ??
    (packageJson as { orangesliceApiKey?: string }).orangesliceApiKey;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Orange Slice API key is not configured." },
      { status: 500 },
    );
  }

  let query = "";
  try {
    const body = (await request.json()) as { query?: string };
    query = body.query?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!query) {
    return NextResponse.json(
      { error: "Company query is required." },
      { status: 400 },
    );
  }

  try {
    const result = await lookupCompany(query, apiKey);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Company lookup failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
