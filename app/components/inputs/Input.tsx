'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
    id: string;
    type: string;
    placeholder: string;
    required: boolean;
    register:UseFormRegister<FieldValues>;
    errors: FieldErrors;
}
const Input:React.FC<InputProps> = ({
    id,
    type,
    placeholder,
    required,
    register,
    errors
}) => {
  return (
    <div className="mb-3">
        <input 
        className={`${errors[id] ? "border border-red-500" : "border border-gray-500"} rounded-md w-full h-12 px-3 text-lg outline-none`}
        {...register(id, {required})} 
        type={type} 
        placeholder={placeholder} 
        id={id} />
    </div>
  )
}

export default Input