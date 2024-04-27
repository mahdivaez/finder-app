import { StreamChat } from "stream-chat";
("use server");
import { getSession } from "@/lib/auth";

export async function generateTokenAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("No session find ");
  }
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.NEXT_PUBLIC_GET_SECRET_KEY!;

  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session.user.id);
  return token;
}
