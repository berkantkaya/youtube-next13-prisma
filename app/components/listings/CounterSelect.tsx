'use client'
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'

interface CounterSelectProps{
    title : string;
    description: string;
    value: number;
    onChange:(value: number) => void;
}
const CounterSelect:React.FC<CounterSelectProps> = ({
    title,
    description,
    value,
    onChange
}) => {

    const decrement = () => {
       if(value == 1) return null;
       onChange(value - 1)
    }

    const increment = () => {
        onChange(value + 1) 
    }
  return (
    <div className='flex items-center justify-between'>
        <div className="">
            <div className="text-xl font-bold tracking-wider">{title}</div>
            <div className="text-gray-500">{description}</div>
        </div>
        <div className="flex items-center gap-6">
            <div onClick={decrement} className='cursor-pointer'>
              <AiOutlineMinus size={25}/>
            </div>
            
             <div className='text-2xl font-bold'>{value}</div>

             <div onClick={increment} className='cursor-pointer'>
              <AiOutlinePlus size={25}/>
             </div>
           
        </div>
    </div>
  )
}

export default CounterSelect