import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';
import { Label as CustomLabel } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utility/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

const Signup = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      console.log(res.data.success);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action='' onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-4 my-10 bg-[#ebeef0]'>
          <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>

          <div className='my-4'>
            <CustomLabel htmlFor='fullName' className='block text-sm font-medium text-gray-700'>
              Full Name
            </CustomLabel>
            <Input id='fullName' type='text' placeholder='Enter your full name' className='mt-1' value={input.fullname} name="fullname" onChange={changeEventHandler} />
          </div>

          <div className='my-4'>
            <CustomLabel htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </CustomLabel>
            <Input id='email' type='email' placeholder='Enter your email' className='mt-1' value={input.email} name="email" onChange={changeEventHandler} />
          </div>

          <div className='my-4'>
            <CustomLabel htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </CustomLabel>
            <Input id='password' type='password' placeholder='Enter your password' className='mt-1' value={input.password} name="password" onChange={changeEventHandler} />
          </div>

          <div className='my-4'>
            <CustomLabel htmlFor='phone' className='block text-sm font-medium text-gray-700'>
              Phone Number
            </CustomLabel>
            <Input id='phone' type='tel' placeholder='Enter your phone number' className='mt-1' value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
          </div>

          <div className=''>
            <CustomLabel>Profile</CustomLabel>
            <Input accept="image/*"
              type='file'
              onChange={changeFileHandler}
              className='cursor-pointer'
            />
          </div>

          <div className='mb-7 mt-5'>
            <RadioGroup className="flex items-center justify-center gap-12">
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='student' checked={input.role === 'student'} onChange={changeEventHandler} className='cursor-pointer' />
                <CustomLabel htmlFor="r1">Student</CustomLabel>
              </div>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' checked={input.role === 'recruiter'} onChange={changeEventHandler} className='cursor-pointer' />
                <CustomLabel htmlFor="r1">Recruiter</CustomLabel>
              </div>
            </RadioGroup>
          </div>

          {
            loading ? (<Button className='w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900'><Loader2 className='mr-2 h-4 animate-spin' />Please Wait...</Button>) : (<Button
              type='submit'
              className='w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900'
            >
              Sign Up
            </Button>)
          }


          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?
            <Link to='/login' className='text-indigo-600 hover:underline ml-1'>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
