import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/app/lib/verifyAdmin';

export async function GET(req: NextRequest) {
  try {
    const adminId = verifyAdmin(req.headers); // ✅ headers: Headers object
    return NextResponse.json({ isAdmin: true, adminId });
  } catch {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }
}
