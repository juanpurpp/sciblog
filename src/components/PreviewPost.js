import Image from 'next/image';
const PreviewPost = ({className}) => {
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
        <div className="bg-terciary-bg text-on-secondary w-3/4 h-60 flex flex-col border-2 border-gray-700 rounded-md ">
          <div className="">
            <p className=""> Hábitos que mejoran la memoria </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPost