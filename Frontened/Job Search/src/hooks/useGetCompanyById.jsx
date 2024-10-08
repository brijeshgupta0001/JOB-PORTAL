import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utility/constant'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { setSingleCompany } from '@/redux/companySlice';
const useGetCompanyById = (CompanyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${CompanyId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleCompany();
  }, [CompanyId, dispatch])
}

export default useGetCompanyById