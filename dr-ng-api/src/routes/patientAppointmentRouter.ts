import { Router, Request, Response } from "express";
import validationMiddleWare from "../middleware/validationMiddleWare";
import { PatientAppointmentInstance } from "../model/patientAppointment";
import validator from "../validator/patientAppointmentValidator";
const router = Router();
const endPoint = "/api/patient-appointment/";
const pageSize = 10;

router.get(
  endPoint,
  validator.checkPage(),
  validationMiddleWare.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      let page = req.query?.page as number | undefined;
      if (page == undefined) page = 1;
      const offset = (page - 1) * pageSize;
      const records = await PatientAppointmentInstance.findAll({
        where: {},
        offset: offset,
        limit: pageSize,
      });
      const total = await PatientAppointmentInstance.count();
      return res.json({ data: records, total: total });
    } catch (error) {
      return res.json({
        message: "fail to read patient appointment",
        status: 500,
        endPoint: endPoint,
      });
    }
  }
);

router.get(`${endPoint}:id`, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await PatientAppointmentInstance.findOne({ where: { id } });
    if (!record) {
      return res.json({ message: `no record with the id ${id}` });
    }
    return res.json(record);
  } catch (error) {
    return res.json({ message: "fail to read", status: 500 });
  }
});

router.post(
  endPoint,
  validator.checkCreatePatientAppointment(),
  validationMiddleWare.handleValidationError,

  async (req: Request, res: Response) => {
    try {
      const record = await PatientAppointmentInstance.create({ ...req.body });
      const bookingDate = record.dataValues.bookingDate;
      const SN = record.dataValues.id;
      const DD = bookingDate.getDay.toString().padStart(2, "0");
      const MM = bookingDate.getMonth.toString().padStart(2, "0");
      const bookingYear = bookingDate.getFullYear.toString();
      const YY = bookingYear.substring(bookingYear.length - 2);
      record.update({
        uniqueCode: `A${SN}${DD}${MM}${YY}`,
      });
      return res.json({
        message: "The appointment has been created",
        status: 201,
        record,
      });
    } catch (error) {
      return res.json({ message: "fail to create appointment", status: 500 });
    }
  }
);
router.put(
  `${endPoint}:id`,
  validator.checkUpdatePatientAppointment(),
  validationMiddleWare.handleValidationError,

  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await PatientAppointmentInstance.findOne({
        where: { id },
      });
      if (!record) {
        return res.json({ message: `no record with the id ${id}` });
      }
      record.update({ ...req.body });
      return res.json(record);
      
    } catch (error) {
      return res.json({ message: "fail to create appointment", status: 500 });
    }
  }
);

export { router as patientAppointmentRouter };
