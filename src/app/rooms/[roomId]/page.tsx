import { getRoom } from "@/data-access/rooms";
export default async function RoomPage(props :{params :{roomId:string}}){
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);

    return <div>{room?.name}</div>
}