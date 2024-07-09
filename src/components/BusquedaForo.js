import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
const BusquedaForo = ({className,placeholder}) => {
  return (
    <div className={className}>
      <div className='w-full h-10 flex flex-row'>
        <input type='text' className=' w-full dark:text-gray-950 dark:bg-violet-100 py-5 px-3 inset-primary-bg outline outline-1 outline-violet-800 rounded-l-md'placeholder={placeholder}/>
        <MagnifyingGlassIcon className='h-full text-on-primary p-1 bg-primary-bg outline outline-1 outline-violet-800 rounded-r-md '/>
      </div>
    </div>
  )
}

export default BusquedaForo