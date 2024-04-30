import axios from 'axios';
import SibApiV3Sdk from '@getbrevo/brevo';

export const POST = async (req: Request) => {
  try {
    const { email, verificationCode } = await req.json();
    return Response.json('POST request received', { status: 200 })
  } catch (err) { 
    return new Response(`Error: ${err}`, { status: 500 })
  }
}