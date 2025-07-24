import { TaskComment } from "../../../models/TaskComment.js";
import mongoose from "mongoose";
import { StatusError } from "../../../config/index.js";

/**
 * Get paginated task comments with created_by user details
 */
export const getTaskCommentList = async (req, res, next) => {
  try {
    const { task_id, page = 1, limit = 10 } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    if (!task_id) {
      throw new StatusError("task_id is required", 400);
    }

    const condition = {
      status: "active",
      task_id: new mongoose.Types.ObjectId(task_id) // 👈 convert to ObjectId
    };

    // Count total records
    const totalRecords = await TaskComment.countDocuments(condition);
    if (totalRecords === 0) {
      return res.ok({
        page: pageNumber,
        limit: pageSize,
        total_records: 0,
        total_pages: 0,
        results: [],
      });
    }

    // Fetch paginated data with user details
    const taskComments = await TaskComment.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: pageSize },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "user_details"
        }
      },
      {
        $unwind: {
          path: "$user_details",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          comment: 1,
          task_id: 1,
          createdAt: 1,
          status: 1,
          "user_details._id": 1,
          "user_details.full_name": 1,
          "user_details.email": 1,
          "user_details.phone": 1,
          "user_details.role": 1,
        }
      }
    ]);

    const results = taskComments.map(data => ({
      id: data._id,
      comment: data.comment,
      task_id: data.task_id,
      createdAt: data.createdAt
        ? new Date(data.createdAt).toLocaleDateString("en-GB") // optional format change
        : null,
      status: data.status,
      created_by: data.user_details
        ? {
            id: data.user_details._id,
            name: data.user_details.full_name,
            email: data.user_details.email,
            phone: data.user_details.phone,
            role: data.user_details.role
          }
        : null
    }));

    return res.ok({
      page: pageNumber,
      limit: pageSize,
      total_records: totalRecords,
      total_pages: Math.ceil(totalRecords / pageSize),
      results
    });

  } catch (error) {
    console.error("Error in getTaskCommentList:", error);
    next(error);
  }
};