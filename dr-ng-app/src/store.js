"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const patientAppointmentSlice_1 = __importDefault(require("./features/patient-appointment/patientAppointmentSlice"));
const store = (0, toolkit_1.configureStore)({
    reducer: patientAppointmentSlice_1.default,
});
exports.default = store;
