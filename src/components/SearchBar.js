import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import Link from 'next/link'
const SearchBar = ({className,placeholder, search, setSearch}) => {
  return (
    <div className={className}>
      <div className='w-full h-10 flex flex-row'>
        <input type='text' valie={search} onChange={e=>setSearch(e.target.value)} className=' w-full dark:text-gray-950 dark:bg-violet-100 py-5 px-3 inset-primary-bg outline outline-1 outline-violet-800 rounded-l-md'placeholder={placeholder}/>
        {
          search ?(
            <Link href={`/buscar/${search}`} className='cursor-pointer hover:bg-violet-500 w-12'>
              <MagnifyingGlassIcon className='h-full text-on-primary p-1 bg-primary-bg outline outline-1 outline-violet-800 rounded-r-md '/>
            </Link>
          ):
          (
            <MagnifyingGlassIcon className='h-full text-on-primary p-1 bg-primary-bg outline outline-1 outline-violet-800 rounded-r-md '/>
          )
        }
      </div>
    </div>
  )
}

export default SearchBar