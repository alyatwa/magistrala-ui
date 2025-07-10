"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="relative w-full flex items-center justify-start px-32 py-8">
      <div
        className="absolute inset-0 w-full h-full "
        style={{
          backgroundImage: "url('/landing/contact-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="backdrop-blur-xs   w-full h-full " />
      </div>

      {/* Contact Card */}
      <div className="relative z-10 bg-white bg-opacity-95 rounded-3xl p-8 max-w-[420px] w-full shadow-2xl">
        {/* Header with logo */}
        {/* <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">✉</span>
            </div>
            <span className="text-gray-800 font-medium">Contact</span>
          </div>
        </div> */}

        {/* Main Title */}
        <h1 className="text-4xl font-light text-gray-900 mb-6 leading-tight">
          Get in Touch
          <br />
          with Us
        </h1>

        {/* Subtitle */}
        {/* <p className="text-gray-700 text-lg mb-8">
          We&apos;d love to hear from you. Send us a message and we&apos;ll
          respond as soon as possible.
        </p> */}

        {/* Contact Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-4 text-white bg-green-600 hover:bg-green-700 rounded-xl"
            >
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
