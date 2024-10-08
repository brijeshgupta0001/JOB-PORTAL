import { Job } from "../models/jobModel.js";
// For Admin
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;
    if (!description || !title || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false
      })
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experiencelevel: experience,
      position,
      company: companyId,
      created_by: userId
    })
    return res.status(201).json({
      message: "New Job created successfully!",
      job,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
//For Students
export const getAlljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };
    const jobs = await Job.find(query).populate({
      path: "company"
    }).sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

//For students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });
    // .sort({ createdAt: -1 });

    if (!job) {
      return res.status(404).json({
        message: "jobs not found",
        success: false
      })
    }
    return res.status(200).json({
      job,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

//how many jobs arre created By admin yet

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company"
    }).sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No job found",
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}