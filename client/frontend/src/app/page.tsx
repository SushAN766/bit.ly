"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
  url: z.string().url("Invalid URL format"),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/urls/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data.url }),
      });
      fetch('your-api-endpoint')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle your JSON data here
  })
  .catch(error => {
    console.error('Error creating short URL:', error);
  });

     const result = await response.json();

      if (response.ok) {
        alert(`Short URL created: ${result.slug}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating short URL:", error);
      alert("Failed to create short URL");
    }
  };


  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">URL Shortener</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* URL Input Field */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>The URL you want to shorten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
fetch('your-api-endpoint')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle your JSON data here
  })
  .catch(error => {
    console.error('Error creating short URL:', error);
  });
