/*
    Fields:
    name
    email
    password
    age
    telephone
    isVerified
*/

import { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    password: {
        type: String,
    },

    age: {
      type: Number,
    },
    telephone: {
        type: String,
    },
    isVerified: {
        type: Boolean
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Patients", patientSchema);