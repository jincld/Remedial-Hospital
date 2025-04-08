/*
    Fields:
    date
    time
    motive
    doctor_id
    patient_id
*/

import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    date: {
      type: String,
      require: true,
    },

    time: {
      type: String,
    },

    motive: {
        type: String,
    },

    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: "Doctors",
      require: true
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "Patients",
      require: true
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Appointment", appointmentSchema);