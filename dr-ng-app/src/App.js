"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const useTypedSelector_1 = require("./hooks/useTypedSelector");
const patientAppointmentSlice_1 = require("./features/patient-appointment/patientAppointmentSlice");
const home_1 = __importDefault(require("./views/home"));
const App = () => {
    const dispatch = (0, useTypedSelector_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, patientAppointmentSlice_1.fetchPatientAppointments)());
    }, [dispatch]);
    const { patientAppointmentData: data, error, isFetchingAppointment, } = (0, useTypedSelector_1.useAppSelector)((state) => state);
    console.log(data, error, isFetchingAppointment);
    return (<div className="App">
      <home_1.default></home_1.default>
    </div>);
};
exports.default = App;
