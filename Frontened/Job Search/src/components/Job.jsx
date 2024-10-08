import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({ job }) => {

  const navigate = useNavigate();

  const daysAgoFuction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  const jobid = "36473267345646";
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-550'>{daysAgoFuction(job?.createdAt) === 0 ? "Today" : `${daysAgoFuction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark></Bookmark></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button variant="outline" className="p-6 " size="icon">
          <Avatar >
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div className=''>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}Position</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209B7]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job