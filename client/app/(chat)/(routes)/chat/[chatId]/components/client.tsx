"use client";
import ChatHeader from '@/components/chat-header';
import { Companion, Message } from '@prisma/client';
import React from 'react'

interface ChatClientProps {
    companion: Companion & {
        _count: {
            messages: number
        },
        messages: Message[]
    };
};

export default function ChatClient({companion}: ChatClientProps) {
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
        <ChatHeader companion={companion} />
    </div>
  )
}
