import Notification from "../models/notification.js";

export const getUserNotifications = async (req, res) => {
  try {
    const { _id } = req.params;
    const notifications = await Notification.find({ user: _id, read: false })
      .sort("-createdAt")
      .populate("sender");

    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const readOneNotification = async (req, res) => {
  try {
    const { _id } = req.body;
    const notification = await Notification.findByIdAndUpdate(
      { _id: _id },
      { read: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const readAllNotifications = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// deletes a notification
export const deleteOneNotification = async (req, res) => {
  try {
    
    const { notificationId,userId } = req.body;

    // finds notification and deletes it;
    await Notification.findByIdAndDelete(notificationId);

    // then we need to get the rest of the notifications to update
    const notifications = await Notification.find({ user: userId, read: false })
      .sort("-createdAt")
      .populate("sender");

    
    // sends back response with updated notifications
    res.status(200).json(notifications);

    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
