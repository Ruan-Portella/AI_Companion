"use client";
import { ChatRequestOptions } from 'ai'
import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatFormProps {
    isLoading: boolean;
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

export default function ChatForm({isLoading, input, handleInputChange, onSubmit}: ChatFormProps) {
  return (
    <form onSubmit={onSubmit} className='border-t border-primary/10 py-4 flex items-center gap-x-2'>
        <Input disabled={isLoading} value={input} onChange={handleInputChange} placeholder='Type a message' className='rounded-lg bg-primary/10' />
        <Button disabled={isLoading} variant="ghost">
            <SendHorizonal className='h-6 w-6' />
        </Button>
    </form>
  )
}
