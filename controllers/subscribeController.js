import mongoose from 'mongoose';
import User from '../models/User.js';
import Activity from "../models/Activity.js";

export const toggleSubscribe = async (req, res) => {
  try {
    const subscriberId = req.user?.id;
    const { authorId } = req.body;

    if (!subscriberId) return res.status(401).json({ message: 'Unauthorized' });
    if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: 'Invalid authorId' });
    }

    if (subscriberId === authorId) {
      return res.status(400).json({ message: "Can't subscribe to yourself" });
    }

    const author = await User.findById(authorId);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    const already = author.subscribersList?.some((id) => id.toString() === subscriberId);

    if (already) {
  // unsubscribe
  author.subscribersList =
    (author.subscribersList || []).filter(
      (id) =>
        id.toString() !==
        subscriberId
    );

  author.subscribers = Math.max(
    0,
    (author.subscribers || 1) - 1
  );
} else {
  // subscribe
  author.subscribersList =
    author.subscribersList || [];

  author.subscribersList.push(
    subscriberId
  );

  author.subscribers =
    (author.subscribers || 0) + 1;

  await Activity.create({
    user: author._id,
    actor: subscriberId,
    type: "subscribe",
  });
}

    await author.save();

    return res.json({ subscribers: author.subscribers, subscribed: !already });
  } catch (err) {
    console.error('toggleSubscribe error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
