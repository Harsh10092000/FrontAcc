import { IconUsers } from '@tabler/icons-react'


const SelectCustomer = () => {
  return (
    <div className='selectCustomer h-[100vh - 87px] flex flex-col justify-center items-center w-full bg-slate-100'>
        <div>
        <IconUsers className=' w-36 h-36 text-slate-400'/>
        <p>No Customer Selected</p>
        </div>
    </div>
  )
}

export default SelectCustomer