"use client";
import ChatHeader from '@/components/chat-header';
import { useCompletion } from 'ai/react';
import { Companion, Message } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ChatForm from '@/components/chat-form';
import ChatMessages from '@/components/chat-messages';
import { ChatMessageProps } from '@/components/chat-message';

interface ChatClientProps {
    companion: Companion & {
        _count: {
            messages: number
        },
        messages: Message[]
    };
};

export default function ChatClient({companion}: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion(
    { api: `/api/chat/${companion.id}`, 
    onFinish(prompt, completion) { 
      const systemMessage: ChatMessageProps = {
        role: 'system',
        content: completion,
      };
      setMessages([...messages, systemMessage]);
      setInput('');
      router.refresh();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input
    }
    setMessages([...messages, userMessage]);
    handleSubmit(e);
  }

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
        <ChatHeader companion={companion} />
        <ChatMessages companion={companion} isLoading={isLoading} messages={messages} />
        <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} onSubmit={onSubmit} />
    </div>
  )
}
