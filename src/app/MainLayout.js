"use client";
import TopBar from '@/components/TopBar'
import LeftMenu from '@/components/LeftMenu'
import {HomeIcon, UserCircleIcon, ChatBubbleLeftRightIcon, UserGroupIcon, RectangleGroupIcon, QuestionMarkCircleIcon} from '@heroicons/react/24/solid'
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '@nextui-org/react';
import { redirect, usePathname } from 'next/navigation'
import { Context } from '@/contexts/MainContext'
const MainLayout = ({children}) => {

  const options=[
    {
      label: 'Inicio',
      key: '/',
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      label: 'Perfil',
      key: '/perfil',
      icon: <UserCircleIcon className="h-6 w-6" />,
    },
    {
      label: 'Foros',
      key: '/foros',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
    },
    {
      label: 'Preguntas frecuentes',
      key: '/faq',
      icon: <QuestionMarkCircleIcon className="h-6 w-6" />,
    }
  ]
  const {data, status} = useSession()
  const path = usePathname();
  const {theme} = useContext(Context)
  if (typeof windows != 'undefined' && localStorage.getItem('theme') == undefined ) localStorage.setItem('theme', 'light')
  if(status === 'loading') return(
    <div className='w-screen h-screen flex flex-row justify-center items-center'>
      <Spinner/>
    </div>
  )
  if(status == 'authenticated' && !data.user.registered && path !== '/registro' && path !== '/registro/completado'){
    console.log('redirecting')
    redirect('/registro')
  }

  return (
    <div className={`flex flex-col w-screen h-screen ${theme} `}>
      <TopBar className="bg-secondary-bg text-on-secondary w-full h-16" options={[]} />
      <div className='flex flex-row w-full h-full max-h-full bg-background text-on-secondary'>
        <LeftMenu className="bg-primary-bg text-on-primary w-1/6 h-full" options={options} getOptionKey={option=>option.key} getOptionLabel={option=>option.label} getOptionIcon={option=>option.icon}/>
        {children}
      </div>
    </div>
  )
}

export default MainLayout