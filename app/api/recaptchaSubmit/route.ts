import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY as string;

  try {
    const postData = await request.json();
    const { gRecaptchaToken } = postData;

    const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await recaptchaRes.json();

    if (data?.success && data?.score > 0.5) {
      return NextResponse.json({
        success: true,
        score: data.score,
      });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (e) {
    console.error('Error in /api/recaptchaSubmit:', e);
    return NextResponse.json({ success: false, error: 'Server error' });
  }
}
