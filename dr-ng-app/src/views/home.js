"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const Search_1 = __importDefault(require("antd/es/input/Search"));
const layout_1 = require("antd/es/layout/layout");
const react_1 = require("react");
const colors_1 = require("@ant-design/colors");
const icons_1 = require("@ant-design/icons");
const patient_appointment_table_1 = __importDefault(require("../components/patient-appointment-table"));
const useTypedSelector_1 = require("../hooks/useTypedSelector");
const patientAppointmentSlice_1 = require("../features/patient-appointment/patientAppointmentSlice");
const react_router_dom_1 = require("react-router-dom");
const Home = () => {
    var _a, _b, _c, _d;
    const dispatch = (0, useTypedSelector_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, patientAppointmentSlice_1.fetchPatientAppointments)());
    }, [dispatch]);
    const { patientAppointmentData, error, isFetchingAppointment } = (0, useTypedSelector_1.useAppSelector)((state) => state);
    console.log(patientAppointmentData, error, isFetchingAppointment);
    return (<antd_1.Layout style={{ lineHeight: 0, backgroundColor: "#eeeae7" }}>
      <layout_1.Header style={{
            position: "sticky",
            top: 5,
            left: "5%",
            right: "5%",
            zIndex: 1,
            width: "90%",
            height: 50,
            boxShadow: "-2px 2px #888888",
        }}>
        <div style={{
            position: "absolute",
            left: "0",
            backgroundColor: colors_1.blue[7],
            borderBottomRightRadius: 50,
            width: "33%",
            height: "100%",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
        }}>
          <div className="h1" style={{
            marginLeft: "15%",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5em",
        }}>
            DrNG | PATIENT
          </div>
        </div>
      </layout_1.Header>
      <layout_1.Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{
            maxWidth: "80%",
            position: "relative",
            left: "10%",
        }}>
          <antd_1.Row gutter={[200, 16]} style={{ justifyContent: "space-evenly", color: colors_1.red[2] }}>
            <antd_1.Col span={12}>
              <h1>Appointments</h1>
              <div style={{ width: 50, marginLeft: "10%", marginTop: 0 }}>
                <hr style={{ borderTop: `1px solid ${colors_1.red[2]}` }}></hr>
              </div>
            </antd_1.Col>
            <antd_1.Col span={8}>
              <Search_1.default></Search_1.default>
            </antd_1.Col>
          </antd_1.Row>
        </div>
        <div className="site-layout-background" style={{
            maxWidth: "60%",
            position: "relative",
            left: "20%",
            paddingBottom: 20,
        }}>
          <antd_1.Row gutter={[100, 16]} style={{ justifyContent: "space-between" }}>
            <antd_1.Col style={{
            background: colors_1.red[1],
            paddingLeft: 5,
            height: 75,
            lineHeight: 0,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
        }} span={6}>
              <h5>Missed</h5>
              <h4 style={{ color: colors_1.red[5], fontSize: "2em" }}>
                {(_a = patientAppointmentData === null || patientAppointmentData === void 0 ? void 0 : patientAppointmentData.missed) !== null && _a !== void 0 ? _a : 0}
              </h4>
            </antd_1.Col>
            <antd_1.Col style={{
            background: colors_1.gold[1],
            paddingLeft: 5,
            height: 75,
            width: 200,
            lineHeight: 0,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
        }} span={6}>
              <h5>Recheduled</h5>
              <h4 style={{ color: colors_1.gold[5], fontSize: "2em" }}>
                {(_b = patientAppointmentData === null || patientAppointmentData === void 0 ? void 0 : patientAppointmentData.rescheduled) !== null && _b !== void 0 ? _b : 0}
              </h4>
            </antd_1.Col>
            <antd_1.Col style={{
            background: colors_1.geekblue[1],
            paddingLeft: 5,
            height: 75,
            width: 200,
            lineHeight: 0,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
        }} span={6}>
              <h5>Passed</h5>
              <h4 style={{ color: colors_1.geekblue[5], fontSize: "2em" }}>
                {(_c = patientAppointmentData === null || patientAppointmentData === void 0 ? void 0 : patientAppointmentData.passed) !== null && _c !== void 0 ? _c : 0}
              </h4>
            </antd_1.Col>
          </antd_1.Row>
        </div>
        <div className="site-layout-background" style={{
            maxWidth: "80%",
            position: "relative",
            left: "10%",
            paddingBottom: 20,
        }}>
          <patient_appointment_table_1.default />
        </div>
      </layout_1.Content>
      <layout_1.Footer>
        <div style={{
            maxWidth: "80%",
            position: "relative",
            right: "-35%",
        }}>
          <antd_1.Row gutter={[100, 16]} style={{
            color: colors_1.red[2],
        }}>
            <antd_1.Col span={12}>
              <antd_1.Pagination size="small" pageSize={10} showSizeChanger={false} onChange={(page, pageSize) => { }} total={(_d = patientAppointmentData === null || patientAppointmentData === void 0 ? void 0 : patientAppointmentData.total) !== null && _d !== void 0 ? _d : 0}/>
            </antd_1.Col>
            <antd_1.Col span={6}>
              <react_router_dom_1.Link to={"create-appointment"} style={{
            color: "white",
            backgroundColor: colors_1.red[2],
            height: 30,
            width: 30,
            padding: 0,
            boxShadow: "-0.5px 0.5px #888888",
        }}>
                <icons_1.PlusOutlined />
              </react_router_dom_1.Link>
            </antd_1.Col>
          </antd_1.Row>
        </div>
      </layout_1.Footer>
    </antd_1.Layout>);
};
exports.default = Home;
