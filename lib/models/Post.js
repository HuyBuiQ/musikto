import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
    fileType: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    comments: {
      type: [
        {
          comment: String,
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          name: String,
          username: String,
          profilePhoto: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;
