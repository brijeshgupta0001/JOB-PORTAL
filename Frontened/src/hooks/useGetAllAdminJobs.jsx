import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utility/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice';
import axios from 'axios';
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchAllAdminJobs();
  }, [])
}

export default useGetAllAdminJobs