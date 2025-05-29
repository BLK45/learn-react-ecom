//import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const actionLogin = useEcomStore((state)=>state.actionLogin)
  const user = useEcomStore((state)=>state.user)
  console.log('user form zustand', user)

  const [form, setForm ] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleOnSubmit = async(e) =>{
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Welcome Back')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role)=>{
    if(role === 'admin'){
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (
    <div>
      Login
        <form onSubmit={handleOnSubmit}>
        Email
        <input className='border'
          name='email'
          type='email'
          onChange={handleOnChange}
        />

        Password
        <input className='border'
          name='password'
          type='text'
          onChange={handleOnChange}
        />
        <button className='bg-blue-500 rounded-md'>Login</button>
      </form>
    </div>
  )
}

export default Login