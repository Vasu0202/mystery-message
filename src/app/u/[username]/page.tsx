'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MessageSchema } from '@/schemas/messageSchema';

const hardCodedMessages = [
  "What's your favorite movie?",
  "Do you have any pets?",
  "What's your dream job?",
  "What's your favorite book?",
  "What's your favorite hobby?",
  "What's the best place you've traveled to?",
  "What's your favorite food?",
  "What's your biggest fear?",
  "What's your favorite sport?",
  "What's your favorite season?",
];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(false);

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowMessages = () => {
    setShowAllMessages((prev) => !prev);
  };

  const messagesToShow = showAllMessages
    ? hardCodedMessages
    : hardCodedMessages.slice(0, 3);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 p-6">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800 text-center">
          Public Profile Link
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Send Anonymous Message to @{username}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none border-gray-300 rounded-md bg-gray-50 text-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled className="bg-gray-500 text-white hover:bg-gray-600">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !messageContent}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                >
                  Send It
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="space-y-4 my-8">
          <div className="space-y-2 text-center">
            <Button
              onClick={toggleShowMessages}
              className="my-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >
              {showAllMessages ? 'Show Less Messages' : 'Show More Messages'}
            </Button>
            <p>Click on any message below to select it.</p>
          </div>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {messagesToShow.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2 text-gray-700 border-gray-300 hover:bg-gray-100"
                  onClick={() => form.setValue('content', message)}
                >
                  {message}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <Separator className="my-6" />
        <div className="text-center">
          <div className="mb-4 text-gray-700">Get Your Message Board</div>
          <Link href="/sign-up">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
