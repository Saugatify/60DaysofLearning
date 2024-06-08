import mongoose, { Schema } from "mongoose";
import mongooseAggregratePagination from "mongoose-aggregate-paginate-v2"  


const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //Cloudinary
      required: true,
    },
    views: {
      type: Number, //Cloudinary
      default: 0,
    },

    isPublished: {
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);


videoSchema.plugin(mongooseAggregratePagination)

export const Video = mongoose.model("Video", videoSchema);
