import prismadb from '@/lib/prismadb';
import React from 'react'
import CompanionForm from './components/companion-form';

interface CompanionIdPageProps {
    params: {
        companionId: string;
    }
}

export default async function CompanionIdPage({
  params 
}: CompanionIdPageProps) {
  
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId
    }
  })

  const categories = await prismadb.category.findMany();

  return (
    <CompanionForm initialData={companion} categories={categories} />
  )
}
