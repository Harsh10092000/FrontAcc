import { IconCube } from "@tabler/icons-react"


const SelectProduct = () => {
  return (
    <div className='h-[100vh - 87px] flex flex-col justify-center items-center w-full bg-slate-100'>
    <div className="flex flex-col items-center gap-3">
    <IconCube className='w-36 h-36 text-slate-400'/>
    <p>Select a product to view its details</p>
    </div>
</div>
  )
}

export default SelectProduct