import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col space-y-4 p-8 h-screen items-center justify-center'>
      <div className='text-6xl font-bold'>TMS</div>
      <div className='text-justify px-48 pt-16 pb-8'>
        Tenant Management System (TMS) helps real estate proterty owners to
        manage and serve their tenants. It provides tools for managing and
        automating various tasks and processes, such as communication, payment,
        and maintenance, as well as for storing and organizing tenant data and
        documents.
      </div>
      <Link href='/login'>
        <Button className='w-fit px-8 py-4'>Sign In to continue</Button>
      </Link>
    </main>
  );
}
