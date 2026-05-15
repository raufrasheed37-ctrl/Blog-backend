import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
			maxlength: [200, 'Title cannot exceed 200 characters'],
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		excerpt: {
			type: String,
			trim: true,
			maxlength: [500, 'Excerpt cannot exceed 500 characters'],
		},
		content: {
			type: String,
			required: [true, 'Content is required'],
			trim: true,
		},

		category: {
       type: String, 
       default: "Explore",
},
		
		coverImage: {
			type: String,
			trim: true,
		},
		tags: [
			{
				type: String,
				trim: true,
			},
		],
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Author is required'],
		},
		published: {
			type: Boolean,
			default: false,
		},
		featured: {
			type: Boolean,
			default: false,
		},

       likes: {
  type: Number,
  default: 0,
},

likedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

restacks: {
  type: Number,
  default: 0,
},

restackedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

commentCount: {
  type: Number,
  default: 0,
},
   		
		publishedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

postSchema.index({ published: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });

postSchema.pre('validate', function () {
	if (!this.slug && this.title) {
		this.slug = this.title
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
	}

	if (!this.excerpt && this.content) {
		const plainTextContent = this.content.replace(/\s+/g, ' ').trim();
		this.excerpt =
			plainTextContent.length > 160
				? `${plainTextContent.slice(0, 160).trim()}...`
				: plainTextContent;
	}

	if (this.published && !this.publishedAt) {
		this.publishedAt = new Date();
	}

	if (!this.published) {
		this.publishedAt = undefined;
	}
});

export default mongoose.model('Post', postSchema);
