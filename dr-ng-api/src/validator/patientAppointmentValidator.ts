import { body } from "express-validator";

class PatientAppointmentValidator {
  checkCreateTodo() {
    return [
      body("patientName")
        .notEmpty()
        .withMessage("The patient name is required")
        .isString()
        .withMessage("The patient name must be a string"),
      body("patientAddress")
        .optional()
        .isString()
        .withMessage("The patient address must be a string"),
      body("patientCity")
        .optional()
        .isString()
        .withMessage("The patient city must be a string"),
      body("patientAge")
        .optional()
        .isNumeric()
        .withMessage("The patient age must be a string"),
      body("patientEmail")
        .optional()
        .isEmail()
        .withMessage("The patient email must be a valid email"),
      body("patientSex")
        .optional()
        .isIn(["male", "female"])
        .withMessage("The patient sex must be male or female"),
      body("appointmentStatus")
        .optional()
        .isIn(["passed", "missed", "rescheduled", "pending"])
        .withMessage(
          "The appointment status must be in ['passed', 'missed', 'rescheduled', 'pending']"
        ),
      body("commentBefore")
        .optional()
        .isNumeric()
        .withMessage("The comment before must be a string"),
      body("commentAfter")
        .optional()
        .isNumeric()
        .withMessage("The comment after must be a string"),
      body("isFirstTime")
        .optional()
        .isBoolean()
        .withMessage("Is first time must be true of false")
        .default(false),
    ];
  }
}

export default new PatientAppointmentValidator();
