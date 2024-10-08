import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utility/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppliedJobs();
  }, [])
}
export default useGetAppliedJobs;