import prisma from '@/app/libs/prismadb';
import Image from 'next/image';

const Page = async() => {
   const listings = await prisma.listing.findMany({
    orderBy : {
      createdAt: "desc"
    }
   })

  return (
    <div className='flex items-center flex-wrap'>
      {
        listings?.map((list,i) => (
          <div className=' w-[250px] border rounded-lg p-3 m-2' key={i}>
              <Image
                src={list.imageSrc}
                width={200}
                height={200}
                alt=''
              />
              <div className='text-xl tracking-wider mt-2'>
                 {list.category} - {list.locationValue}
              </div>
          </div>
        ))
      }
    </div>
  )
}

export default Page