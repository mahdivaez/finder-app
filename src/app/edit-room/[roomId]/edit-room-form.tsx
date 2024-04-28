"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import CreateRoomAction from "./action";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { useRouter } from 'next/navigation';
import { Room } from "@/db/schema";
import { editRoomAction } from "./action";
// import editRoomAction from "./action";

// Use next/navigation instead of next/router

const formSchema = z.object({
  name : z.string().min(1).max(50),
  description : z.string().min(1).max(250),
  tags : z.string().min(1).max(50),
  githubRepo : z.string().min(1).max(50),

});

export default function EditRoomForm({room}:{room:Room}) {
    const router = useRouter(); // Use useRouter for navigation

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name ?? "",
      description: room.description ?? "",
      tags : room.tags || "",
      githubRepo: room.githubRepo || ""
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editRoomAction({
        ...values, // Pass form values
        id: room.id, // Pass the room id directly
      });
      router.push("/your-rooms"); // Use router.push for navigation
    } catch (error) {
      console.error("Error editing room:", error);
      // Handle error here, maybe display a message to the user
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="Side-Project" />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input  {...field}   placeholder="Im working on a side project , come join me "/>
              </FormControl>
              <FormDescription>
                Please describe what you will be coding on .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="typescript , nextjs , tailwind" />
              </FormControl>
              <FormDescription> 
                 
                    List your programming languages , framework , libraries so people can find you content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="https://github.com/your-repo"/>
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>
 
     
  );
}
