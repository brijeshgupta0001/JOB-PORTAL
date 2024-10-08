import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';
import { Label as CustomLabel } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utility/constant';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading, setUser } from '@/redux/authSlice';

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      console.log(res.data.success);
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
          <h1 className='font-bold text-xl mb-5 text-center'>Log In</h1>


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



          <div className='mb-2 mt-2'>
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
              Log In
            </Button>)
          }

          <span className='text-center text-sm text-gray-600 mt-6'>
            Don't have an account?
            <Link to='/signup' className='text-indigo-600 hover:underline ml-1'>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;