"use server";
import { db } from "@/db";
import { Room, room } from "@/db/schema"; // Assuming Room type definition
import { getSession } from "@/lib/auth";
const CreateRoomAction = async (roomData: Omit<Room, "id" |"userId">) => {
  // Assuming roomData only contains properties from the Room type
  const session = await getSession()
  console.log(session);
  if(!session) {
    throw new Error("You must logged in before creating a room");
  }
  
  await db.insert(room).values({ ...roomData, userId: session.user.id });
};

export default CreateRoomAction;