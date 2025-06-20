import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = {
      name: "DailyMint",
      description: "Create, mint, and earn daily",
      icon: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
      url: process.env.NEXT_PUBLIC_URL,
    };
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
