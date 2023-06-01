import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';



export async function POST(request: Request){
 const user = await getCurrentUser();

 if(!user){
    return NextResponse.error();
 }

 const body = await request.json();

 const {imageSrc, category, roomCount, location} = body;

  Object.keys(body).forEach((value :any) => {
     if(!body[value]){
        NextResponse.error()
     }
  })
  const listing = await prisma.listing.create({
    data:{
        imageSrc,
        category,
        roomCount,
        locationValue: location.value,
        userId: user.id
    }
  })
  if(!listing){
     NextResponse.error();
  }
  return NextResponse.json(listing);
}