import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    label: { type: String, trim: true },
    type: { type: String, trim: true },
    defaultValue: { type: String, trim: true }
  },
  { _id: false } // prevents auto _id inside fields array
);

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    componentName: { type: String, required: true, trim: true },
    previewImage: { type: String },

    //  SAFEST WAY TO DEFINE ARRAY OF OBJECTS
    fields: {
      type: [fieldSchema],
      default: []
    },

    // Rich template blocks (for visual editor)
    blocks: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },

    isSystem: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

//  Prevent model overwrite issues completely
if (mongoose.models.Temp) {
  delete mongoose.models.Temp;
}

export const Temp = mongoose.model("Temp", templateSchema);
