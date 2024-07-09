import Image from 'next/image';
const PreviewPost = ({className, titulo, descripcion='', autor='' ,tags =[]}) => {
  return (
    <div className={className}>
      <div className="w-full flex flex-row">
        <div className="w-96 h-60 border-2 border-gray-700 rounded-md ">
          <Image
            width={400}
            height={500}
            src={'/pre.webp'}>
          </Image>
        </div>
        <div className="bg-primary-bg text-on-primary w-3/4 h-60 flex flex-col border-2 border-gray-700 rounded-md ">
          <div className="flex flex-col justify-start items-start p-2">
            <p className="text-lg font-semibold mb-2">{titulo} </p>
            <p className='text-md mb-14'>{descripcion}</p>
            <p className='text-xs mb-8'>Por {autor}</p>
            <div className='flex flex-row space-x-2'>
              {tags.map((tag, index) => (<p className='border border-slate-300 rounded-md p-0.5 bg-blue-900 text-xs' key={index}>{tag}</p> ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPost