import Image from 'next/image'
import { Metadata } from 'next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { SignupForm } from './components/signup-form'
import { SigninForm } from './components/signin-form'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthenticationPage() {
  return (
    <main className='w-full min-h-screen'>
      <section className='w-full min-h-screen'>
        <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex justify-center items-center">
            <div className="absolute inset-0 bg-muted" />
            <div className="relative z-20 flex flex-col items-center text-lg text-center gap-6 max-w-md px-6">
              <Image className='max-w-[260px]' width={1000} height={1000} src={process.env.NEXT_PUBLIC_LOGO_URL || ''} alt='' />
            </div>
          </div>
          <div className="lg:p-8">
            <div className='flex lg:hidden w-full justify-center items-center pb-12'>
              <Image className='max-w-[200px]' width={1000} height={1000} src={process.env.NEXT_PUBLIC_LOGO_URL || ''} alt='' />
            </div>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
              <Tabs defaultValue="sign in" className="w-full">
                <TabsList className='w-full'>
                  <TabsTrigger className='w-full' value="sign up">Create an account</TabsTrigger>
                  <TabsTrigger className='w-full' value="sign in">Login to your account</TabsTrigger>
                </TabsList>
                <TabsContent value="sign up"><SignupForm /></TabsContent>
                <TabsContent value="sign in"><SigninForm /></TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}