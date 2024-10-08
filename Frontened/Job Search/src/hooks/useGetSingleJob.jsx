import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utility/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs, setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();

}

export default useGetSingleJob