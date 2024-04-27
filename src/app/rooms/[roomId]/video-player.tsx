"use client"
import { Room } from "@/db/schema";
import { stepButtonClasses } from "@mui/material";
import {
    Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
    CallControls,
    SpeakerLayout,
    StreamTheme,
  } from '@stream-io/video-react-sdk';
  
  import '@stream-io/video-react-sdk/dist/css/styles.css';
  import { generateTokenAction } from "@/lib/action";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
const userId = "user-id";
const token = "";


export function DevFinderVideo({room}:{room:Room}) {

    const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!room || !session.data || !apiKey || !token) return;

    const userId = session.data.user.id;
    const client = new StreamVideoClient({ apiKey, user: { id: userId },tokenProvider:() => generateTokenAction() });

    const call = client.call("default", room.id);
    call.join({ create: true });

    setClient(client);
    setCall(call);

    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [session, room, apiKey, token]);

  return (
    client && call && (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <SpeakerLayout />
            <CallControls />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
}

