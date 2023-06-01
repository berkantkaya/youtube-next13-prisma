'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal"
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import {FcGoogle} from 'react-icons/fc'
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { elementModalFunc, loginModalFunc, registerModalFunc } from "@/app/redux/modalSlice";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { categories } from "../navbar/Categories";
import CategorySelect from "../listings/CategorySelect";
import CountrySelect from "../listings/CountrySelect";
import CounterSelect from "../listings/CounterSelect";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

const ElementModal = () => {

    const [imgsSrc, setImgsSrc] = useState([])
    const { register, handleSubmit, watch,setValue,reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            imageSrc:'',
            category:'',
            roomCount:1,
            location: null
        }
    });
    const router = useRouter()
    const {elementModal} = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
       axios.post('/api/listings', data)
       .then(() => {
           toast.success('ekleme işlemi basarılı')
           router.refresh();
           reset()
           dispatch(elementModalFunc())
       })
       .catch((err) => {
        toast.error('ekleme işlemi basarısız!!')
           console.log(err, "err")
       })
    }

    const category = watch('category');
    const roomCount = watch('roomCount');
    const imageSrc = watch('imageSrc');
    const location = watch('location');

    const customSetValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const imageSelectFunc = (e: any) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImgsSrc((imgs):any => [...imgs, reader.result] )
                return customSetValue('imageSrc',reader.result)
            }
            reader.onerror = () => {
                console.log(reader.error)
            }
        }
    }

    const bodyElement = (
        <>
      <div className="flex items-center gap-10 mb-5">
         {
            categories.map((cat,i) => (
                <CategorySelect
                 key={i}
                 name={cat.name}
                 icon= {cat.icon}
                 onClick={(category) => {customSetValue('category', category)}}
                 selected =  {category == cat.name}
                />
            ))
         }
      </div>
      <div className="mb-5">
          <CountrySelect
           value={location}
           onChange={(value) => {customSetValue('location', value)}}
          />
      </div>
      <div className="mb-5">
          <CounterSelect
           title = "Stok Sayısı"
           description = "Stok Sayısı Miktarı(Açıklama)"
           value={roomCount}
           onChange = {(value) => {customSetValue('roomCount', value)} }
          />
      </div>
      <input className="mb-4" multiple type="file" name="file" onChange={val => imageSelectFunc(val)} />
       <div className="mb-5">
        <Image
          src={imageSrc}
          alt=""
          width={200}
          height={200}
        />
       </div>
      </>
    )

  return (
    <div>
        <Modal bodyElement={bodyElement} isOpen={elementModal} onSubmit={handleSubmit(onSubmit)} onClose={() => {dispatch(elementModalFunc())}} btnLabel='Create' title='Create Listing'/>
    </div>
  )
}

export default ElementModal