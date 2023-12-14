"use client";

import { Companion } from '@prisma/client';
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import ChatMessage, { ChatMessageProps } from './chat-message';

interface ChatMessagesProps {
    companion: Companion;
    isLoading: boolean;
    messages: ChatMessageProps[];
}

export default function ChatMessages({companion, isLoading, messages = []}: ChatMessagesProps) {
    const scrollRef = useRef<ElementRef<"div">>(null);
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages.length]);

  return (
    <div className='flex-1 overflow-y-auto pr-4'>
        <ChatMessage 
        isLoading={fakeLoading}
        role="system" 
        content={`Hello, I am ${companion.name}, ${companion.description}`} 
        src={companion.src}  />
        {
            messages.map((message) => (
                <ChatMessage key={message.content} role={message.role} content={message.content} src={message.src} />
            ))
        }
        {
            isLoading && <ChatMessage isLoading role="system" src={companion.src} />
        }
        <div ref={scrollRef} />
    </div>
  )
}
