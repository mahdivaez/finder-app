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
import CreateRoomAction from "./action";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { useRouter } from 'next/navigation';

// Use next/navigation instead of next/router

const formSchema = z.object({
  name : z.string().min(1).max(50),
  description : z.string().min(1).max(250),
  language : z.string().min(1).max(50),
  githubRepo : z.string().min(1).max(50),

});

export default function CreateRoomForm() {
    const router = useRouter(); // Use useRouter for navigation

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      language : "",
      githubRepo : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Assuming you have the userId available from some context or session
    const userId = "someUserId";
  
    // Ensure that the object passed to CreateRoomAction includes all expected properties
    const roomData = {
      userId: userId,
      githubRrpo: values.githubRepo, // Correct the property name here
      ...values, // Spread the form values
    };
  
    await CreateRoomAction(roomData);
    router.push("/"); // Use router.push for navigation

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
                <Input  {...field} />
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
                <Input  {...field} />
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
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Programming Language</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription> 
                 
                    List the primary programming language you are working with
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
                <Input  {...field} />
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
