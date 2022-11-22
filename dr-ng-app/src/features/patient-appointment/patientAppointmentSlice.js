"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientAppointment = exports.createPatientAppointment = exports.fetchPatientAppointments = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const baseUrl = "http://localhost:8000/api/patient-appointment";
const initialState = {
    isFetchingAppointment: false,
    isCreatingAppointment: false,
    isUpdatingAppointment: false,
    error: null,
    patientAppointmentData: null,
};
exports.fetchPatientAppointments = (0, toolkit_1.createAsyncThunk)("get/patientAppointment", (data, thunkApi) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(baseUrl);
        return response.data;
    }
    catch (e) {
        return thunkApi.rejectWithValue(e.message);
    }
}));
exports.createPatientAppointment = (0, toolkit_1.createAsyncThunk)("create/patientAppointment", (data, thunkApi) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(baseUrl, data);
        return response.data;
    }
    catch (e) {
        return thunkApi.rejectWithValue(e.message);
    }
}));
exports.updatePatientAppointment = (0, toolkit_1.createAsyncThunk)("update/patientAppointment", (data, thunkApi) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(baseUrl, data);
        return response.data;
    }
    catch (e) {
        return thunkApi.rejectWithValue(e.message);
    }
}));
//Slice
const patientAppointmentsSlice = (0, toolkit_1.createSlice)({
    name: "patientAppointment",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(exports.fetchPatientAppointments.pending, (state, action) => {
            state.isFetchingAppointment = true;
        })
            .addCase(exports.fetchPatientAppointments.fulfilled, (state, action) => {
            state.isFetchingAppointment = false;
            state.patientAppointmentData = action.payload;
        })
            .addCase(exports.fetchPatientAppointments.rejected, (state, action) => {
            state.isFetchingAppointment = false;
            state.error = action.payload;
        })
            .addCase(exports.createPatientAppointment.pending, (state, action) => {
            state.isCreatingAppointment = true;
        })
            .addCase(exports.createPatientAppointment.fulfilled, (state, action) => {
            var _a, _b, _c;
            state.isCreatingAppointment = false;
            if (((_c = (_b = (_a = state.patientAppointmentData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) >= 0) {
                state.patientAppointmentData.data.push(action.payload);
            }
            else {
                state.patientAppointmentData.data = [action.payload];
                state.patientAppointmentData.total = 1;
                state.patientAppointmentData.rescheduled = 1;
            }
        })
            .addCase(exports.createPatientAppointment.rejected, (state, action) => {
            state.isCreatingAppointment = false;
            state.error = action.payload;
        })
            .addCase(exports.updatePatientAppointment.pending, (state, action) => {
            state.isFetchingAppointment = true;
        })
            .addCase(exports.updatePatientAppointment.fulfilled, (state, action) => {
            var _a, _b;
            state.isFetchingAppointment = false;
            let patientAppointment = (_b = (_a = state.patientAppointmentData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.find((value) => value.id === action.payload.id);
            if (patientAppointment) {
                patientAppointment = action.payload;
            }
        })
            .addCase(exports.updatePatientAppointment.rejected, (state, action) => {
            state.isFetchingAppointment = false;
            state.error = action.payload;
        });
    },
});
exports.default = patientAppointmentsSlice.reducer;
