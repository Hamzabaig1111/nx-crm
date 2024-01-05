import CourseRecord from "../models/coursesmodel.js";
import AdmissionRecord from "../models/admissionrecordmodel.js";
export const CreateCourse = async (req, res) => {
  try {
    const courseData = req.body; // Assuming you send the form data in the request body

    // Create a new CourseRecord instance
    const courseRecord = new CourseRecord(courseData);

    // Save the record to the database
    await courseRecord.save();

    res.status(201).json({ message: "Course record submitted successfully" });
  } catch (error) {
    console.error("Error submitting course record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all course records
export const GetAllCourses = async (req, res) => {
  try {
    console.log(req.user);
    console.log("Request received for GetAllCourses");
    const courseRecords = await CourseRecord.find();
    res.status(200).json(courseRecords);
  } catch (error) {
    console.log(error);
    console.error("Error getting course records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific course record by ID
export const GetSingleCourse = async (req, res) => {
  try {
    const courseRecord = await CourseRecord.findById(req.params.courseId);
    if (!courseRecord) {
      return res
        .status(404)
        .json({ error: "Course record not found try later" });
    }
    res.status(200).json(courseRecord);
  } catch (error) {
    console.error("Error getting course record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a course record by ID
export const UpdateCourse = async (req, res) => {
  try {
    const updatedCourseRecord = await CourseRecord.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (!updatedCourseRecord) {
      return res.status(404).json({ error: "Course record not found" });
    }
    res.status(200).json(updatedCourseRecord);
  } catch (error) {
    console.error("Error updating course record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a course record by ID
export const DeleteCourse = async (req, res) => {
  try {
    const deletedCourseRecord = await CourseRecord.findByIdAndDelete(
      req.params.courseId
    );
    if (!deletedCourseRecord) {
      return res.status(404).json({ error: "Course record not found" });
    }
    res.status(200).json(deletedCourseRecord);
  } catch (error) {
    console.error("Error deleting course record by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CurrentActiveBadges = async (req, res) => {
  try {
    let query = {}; // Default query object

    // Check if status query is present and valid
    if (
      req.query.status &&
      ["inprogress", "will_beStart", "completed"].includes(req.query.status)
    ) {
      query.status = req.query.status;
    } else {
      // If status is not valid or not provided, default to "inprogress"
      query.status = "inprogress";
    }

    const activeBadges = await CourseRecord.find(query);

    // Fetch the number of students enrolled in each batch
    const batchCounts = await AdmissionRecord.aggregate([
      {
        $match: {
          std_batch: { $in: activeBadges.map((badge) => badge.Batch) },
        },
      },
      { $group: { _id: "$std_batch", count: { $sum: 1 } } },
    ]);

    // Merge batchCounts with activeBadges
    const badgesWithStudentCounts = activeBadges.map((badge) => {
      const batchCount = batchCounts.find((count) => count._id === badge.Batch);
      return {
        ...badge.toObject(),
        studentsCount: batchCount ? batchCount.count : 0,
      };
    });

    res.status(200).json({
      status: "success",
      data: badgesWithStudentCounts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const GetTotalNumberOfCourses = async (req, res) => {
  try {
    // Count the total number of courses
    const totalInProgressCourses = await CourseRecord.countDocuments({
      status: "inprogress",
    });

    res.status(200).json({ totalInProgressCourses });
  } catch (error) {
    console.error("Error getting total number of courses:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Total Number of Count batches 
export const getTotalActiveBatchesWithCurrentStatus = async (req, res) => {
  try {
    const totalBatchesByStatus = await CourseRecord.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    const result = {
      totalBatchesByStatus: totalBatchesByStatus.reduce((acc, entry) => {
        acc[entry.status] = entry.count;
        return acc;
      }, {}),
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching total batches by status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
