"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const useTypedSelector_1 = require("../hooks/useTypedSelector");
const patientAppointmentSlice_1 = require("../features/patient-appointment/patientAppointmentSlice");
const colors_1 = require("@ant-design/colors");
const icons_1 = require("@ant-design/icons");
const react_router_dom_1 = require("react-router-dom");
const columns = [
    {
        title: "Name",
        dataIndex: "patientName",
        sorter: {
            compare: (a, b) => compareString(a.patientName, b.patientName),
            multiple: 3,
        },
    },
    {
        title: "Code",
        dataIndex: "uniqueCode",
        sorter: {
            compare: (a, b) => compareString(a.uniqueCode, b.uniqueCode),
            multiple: 3,
        },
    },
    {
        title: "Age",
        dataIndex: "patientAge",
        sorter: {
            compare: (a, b) => a.patientAge - b.patientAge,
            multiple: 2,
        },
        filters: [
            { text: "0 - 5", value: 5 },
            { text: "6 - 12", value: 12 },
            { text: "13 - 21", value: 21 },
            { text: "22 - 35", value: 35 },
            { text: "36 - 55", value: 55 },
            { text: "56 - 79", value: 79 },
            { text: "79 and more", value: 80 },
        ],
        onFilter: (value, record) => {
            var _a, _b, _c, _d, _e, _f;
            switch (value) {
                case 5:
                    return (record.patientAge !== undefined &&
                        record.patientAge !== null &&
                        record.patientAge <= 5 &&
                        record.patientAge >= 0);
                case 12:
                    return record.patientAge <= 12 && ((_a = record.patientAge) !== null && _a !== void 0 ? _a : 0) > 5;
                case 21:
                    return record.patientAge <= 21 && ((_b = record.patientAge) !== null && _b !== void 0 ? _b : 0) > 12;
                case 35:
                    return record.patientAge <= 35 && ((_c = record.patientAge) !== null && _c !== void 0 ? _c : 0) > 21;
                case 55:
                    return record.patientAge <= 55 && ((_d = record.patientAge) !== null && _d !== void 0 ? _d : 0) > 36;
                case 79:
                    return record.patientAge <= 79 && ((_e = record.patientAge) !== null && _e !== void 0 ? _e : 0) > 55;
                case 80:
                    return ((_f = record.patientAge) !== null && _f !== void 0 ? _f : 0) >= 80;
                default:
                    return false;
            }
        },
        ellipsis: true,
    },
    {
        title: "Address",
        dataIndex: "patientAddress",
        sorter: {
            compare: (a, b) => { var _a, _b; return compareString((_a = a.patientAddress) !== null && _a !== void 0 ? _a : "", (_b = b.patientAddress) !== null && _b !== void 0 ? _b : ""); },
            multiple: 1,
        },
    },
    {
        title: "Phone",
        dataIndex: "patientPhone",
        sorter: {
            compare: (a, b) => { var _a, _b; return compareString((_a = a.patientPhone) !== null && _a !== void 0 ? _a : "", (_b = b.patientPhone) !== null && _b !== void 0 ? _b : ""); },
            multiple: 2,
        },
    },
    {
        title: "Status",
        dataIndex: "appointmentStatus",
        sorter: {
            compare: (a, b) => { var _a, _b; return compareString((_a = a.appointmentStatus) !== null && _a !== void 0 ? _a : "", (_b = b.appointmentStatus) !== null && _b !== void 0 ? _b : ""); },
            multiple: 1,
        },
        filters: [
            { text: "rescheduled", value: "rescheduled" },
            { text: "passed", value: "passed" },
            { text: "missed", value: "missed" },
        ],
        onFilter: (value, record) => {
            switch (value) {
                case "rescheduled":
                    return record.appointmentStatus === "rescheduled";
                case "passed":
                    return record.appointmentStatus === "passed";
                case "missed":
                    return record.appointmentStatus === "missed";
                default:
                    return false;
            }
        },
        ellipsis: true,
        render: (_, { appointmentStatus }) => {
            switch (appointmentStatus) {
                case "passed":
                    return (<>
              <antd_1.Tag color={colors_1.geekblue[2]} style={{ color: colors_1.geekblue[5] }} key={appointmentStatus}>
                '{appointmentStatus}'
              </antd_1.Tag>
            </>);
                case "missed":
                    return (<>
              <antd_1.Tag color={colors_1.red[2]} style={{ color: colors_1.red[5] }} key={appointmentStatus}>
                '{appointmentStatus}'
              </antd_1.Tag>
            </>);
                default:
                    return (<>
              <antd_1.Tag color={colors_1.gold[2]} style={{ color: colors_1.gold[5] }} key={appointmentStatus}>
                '{appointmentStatus}'
              </antd_1.Tag>
            </>);
            }
        },
    },
    {
        title: "Action",
        fixed: "right",
        width: 100,
        render: (_, appointment) => (<react_router_dom_1.Link to={`edit-appointment/${appointment.id}`}>edit</react_router_dom_1.Link>),
    },
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
};
const PatientAppointmentTable = () => {
    var _a, _b;
    const dispatch = (0, useTypedSelector_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, patientAppointmentSlice_1.fetchPatientAppointments)());
    }, [dispatch]);
    const { patientAppointmentData, error, isFetchingAppointment } = (0, useTypedSelector_1.useAppSelector)((state) => state);
    console.log(patientAppointmentData, error, isFetchingAppointment);
    if (isFetchingAppointment) {
        return (<div style={{ textAlign: "center" }}>
        <antd_1.Space size="middle">
          <antd_1.Spin />
        </antd_1.Space>
      </div>);
    }
    if (error) {
        return (<div style={{ textAlign: "center", color: colors_1.red[2] }}>
        <icons_1.BugOutlined style={{ fontSize: "5em" }}/>
        <h1>error</h1>
        <h6>{error}</h6>
      </div>);
    }
    if (((_b = (_a = patientAppointmentData === null || patientAppointmentData === void 0 ? void 0 : patientAppointmentData.data) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) === 0) {
        return (<div>
        <antd_1.Empty />;
      </div>);
    }
    return (<antd_1.Table columns={columns} dataSource={patientAppointmentData.data} onChange={onChange} pagination={false}/>);
};
exports.default = PatientAppointmentTable;
function compareString(a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
}
