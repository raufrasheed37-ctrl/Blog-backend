import mongoose from "mongoose";
import Activity from "../models/Activity.js";

// GET THE AUTHENTICATED USER'S ACTIVITY
export const getActivity = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 20, 1),
      50
    );

    const skip = Math.max(
      parseInt(req.query.skip, 10) || 0,
      0
    );

    const [activities, total, unreadCount] = await Promise.all([
      Activity.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("actor", "name username avatar profileImage")
        .populate("post", "title slug coverImage")
        .populate("comment", "content")
        .lean(),

      Activity.countDocuments({ recipient: userId }),

      Activity.countDocuments({
        recipient: userId,
        read: false,
      }),
    ]);

    const response = {
  activities,
  total,
  unreadCount,
  limit,
  skip,
  hasMore: skip + activities.length < total,
};

console.log("ACTIVITY API RESPONSE:", {
  isArray: Array.isArray(response),
  keys: Object.keys(response),
  total: response.total,
  activitiesCount: response.activities.length,
});

return res.status(200).json(response);
    
  } catch (error) {
    console.error("Get activity error:", error);

    return res.status(500).json({
      message: "Failed to load activity",
    });
  }
};

// MARK ONE NOTIFICATION AS READ
export const markActivityRead = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid activity ID",
      });
    }

    const activity = await Activity.findOneAndUpdate(
      {
        _id: id,
        recipient: userId,
      },
      {
        $set: { read: true },
      },
      {
        new: true,
      }
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    return res.json({
      message: "Activity marked as read",
      activity,
    });
  } catch (error) {
    console.error("Mark activity read error:", error);

    return res.status(500).json({
      message: "Failed to update activity",
    });
  }
};

// MARK ALL NOTIFICATIONS AS READ
export const markAllActivityRead = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const result = await Activity.updateMany(
      {
        recipient: userId,
        read: false,
      },
      {
        $set: { read: true },
      }
    );

    return res.json({
      message: "All activity marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Mark all activity read error:", error);

    return res.status(500).json({
      message: "Failed to update activity",
    });
  }
};
