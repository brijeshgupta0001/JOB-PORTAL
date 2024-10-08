import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false
      })
    }
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false
      })
    }

    //check if job exists

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      })
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied Successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { created: -1 } },
      populate: {
        path: 'company',
        options: { sort: { created: -1 } },
      }
    });
    if (!application) {
      return res.status(404).json({
        message: "You have not appliesd yet for any job",
        success: false
      })
    }
    return res.status(200).json({
      application,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
}

//No. of applicant applies for a specific job seen bu admin

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { created: -1 } },
      populate: {
        path: 'applicant'
      }
    });
    if (!job) {
      return res.status(404).json({
        message: "Job is not found",
        success: false
      })
    };

    return res.status(200).json({
      job,
      success: true
    });

  } catch (error) {
    console.log(error);
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationid = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "No status is available",
        success: false
      })
    }

    const application = await Application.findOne({ _id: applicationid });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      })
    }

    //update status

    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true
    });

  } catch (error) {
    console.log(error);
  }
}