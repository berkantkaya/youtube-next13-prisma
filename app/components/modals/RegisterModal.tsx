'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal"
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import {FcGoogle} from 'react-icons/fc'
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { registerModalFunc } from "@/app/redux/modalSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            name: "",
            email:"",
            password:""
        }
    });
    const {registerModal} = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        axios.post('/api/register', data)
        .then(() => {
            dispatch(registerModalFunc())
            toast.success('Register işlemi basarılı!!!')
        })
        .catch((err: any) => {
            toast.error('Register işlemi hatalı!!!')
        })
    }

    const bodyElement = (
      <div>
         <Input
          id="name"
          type="text"
          placeholder="Name"
          register={register}
          errors={errors}
          required
         />
          <Input
          id="email"
          type="text"
          placeholder="Email"
          register={register}
          errors={errors}
          required
         />
          <Input
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          required
         />
      </div>
    )
    const footerElement = (
        <div className="mt-5">
            <Button
              btnLabel="Google ile Giriş"
              outline
              icon={FcGoogle}
              onSubmit={() => {signIn('google')}}
            />
        </div>
    )
  return (
    <div>
        <Modal footerElement={footerElement} bodyElement={bodyElement} isOpen={registerModal} onSubmit={handleSubmit(onSubmit)} onClose={() => {dispatch(registerModalFunc())}} btnLabel='Register' title='Register'/>
    </div>
  )
}

export default RegisterModal