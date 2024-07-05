import { XMarkIcon } from "@heroicons/react/24/solid"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"

const TagsSelection = ({values, onChange}) => {
  const [tag, setTag] = useState('')
  const handleAdd = () =>{
    if(tag){
      onChange([...values, tag])
      setTag('')
    }
  }
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row space-x-2 items-center">
        <Input color="primary" type="text" label="Tag" onValueChange={setTag} value={tag}/>
        <Button color="primary" onClick={handleAdd}>Añadir</Button>
      </div>
      <ul className="flex flex-row flex-wrap">
        {values.map((tag, index) => (
          <li key={index} className="rounded-xl border-2 border-blue-600 bg-indigo-200 py-0.5 px-2 mr-2 mt-1 flex flex-row items-center space-x-1">
            <label className="text-nowrap" htmlFor={tag}>{tag}</label>
            <XMarkIcon className="h-4 w-4 ml-1 cursor-pointer rounded-full hover:bg-red-400" onClick={() => onChange(values.filter((_,i) => i!==index))} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TagsSelection