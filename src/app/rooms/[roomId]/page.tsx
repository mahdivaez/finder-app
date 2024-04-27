import { getRoom } from "@/data-access/rooms";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { Langar } from "next/font/google";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/components/tags-list";
import { DevFinderVideo } from "./video-player";
export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  const tags = splitTags(room.tags) ;

  return (
    <div className="min-h-screen">
      {" "}
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-3  p-4 pr-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4  ">
          <DevFinderVideo room={room}/>            
          </div>
        </div>
        <div className="col-span-1  p-4 pl-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex-col flex gap-4">
            <h1 className="text-base"> {room?.name}</h1>


            {room.githubRepo && (
              <Link
                href={room.githubRepo}
                className="flex items-center gap-2 text-sm text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon /> Github Project
              </Link>
            )}
            <p className="text-base text-gray-600"> {room?.description} </p>
           
            <h3>Tags:</h3>
            <TagsList tags={tags}/>
           
          </div>
        </div>
      </div>
    </div>
  );
}
