'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal"
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import {FcGoogle} from 'react-icons/fc'
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { loginModalFunc, registerModalFunc } from "@/app/redux/modalSlice";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginModal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            email:"",
            password:""
        }
    });
    const router = useRouter()
    const {loginModal} = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        signIn('credentials' , {
            ...data,
            redirect: false
        })
        .then((callback) => {
            if(callback?.ok){
                dispatch(loginModalFunc())
                router.refresh();
                toast.success('login işlemi basarılı!!!')
            }
            if(callback?.error){
                toast.error('login işlemi hatalı!!!')
            }
        })
    }

    const bodyElement = (
      <div>
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
        <Modal footerElement={footerElement} bodyElement={bodyElement} isOpen={loginModal} onSubmit={handleSubmit(onSubmit)} onClose={() => {dispatch(loginModalFunc())}} btnLabel='Login' title='Login'/>
    </div>
  )
}

export default LoginModal