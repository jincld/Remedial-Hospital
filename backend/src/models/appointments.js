/*
    Fields:
    date
    time
    motive
    doctor
    patient
*/

import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
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

    specialty: {
      type: String,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Appointment", appointmentSchema);