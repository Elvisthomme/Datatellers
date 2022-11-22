"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("@ant-design/colors");
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const TextArea_1 = __importDefault(require("antd/es/input/TextArea"));
const layout_1 = require("antd/es/layout/layout");
const react_router_dom_1 = require("react-router-dom");
const useTypedSelector_1 = require("../hooks/useTypedSelector");
const patientAppointmentSlice_1 = require("../features/patient-appointment/patientAppointmentSlice");
const CDPatientAppointment = () => {
    var _a;
    const [form] = antd_1.Form.useForm();
    const { id } = (0, react_router_dom_1.useParams)();
    const { patientAppointmentData } = (0, useTypedSelector_1.useAppSelector)((state) => state);
    const patientAppointment = (_a = patientAppointmentData === null || patientAppointmentData === void 0 ? void 0 : patientAppointmentData.data) === null || _a === void 0 ? void 0 : _a.find((value) => value.id.toString() === id);
    const onFinish = (values) => {
        if (patientAppointment) {
            patientAppointment.patientName = values.patientName;
            patientAppointment.patientPhone = values.patientPhone;
            patientAppointment.patientAddress = values.patientAddress;
            patientAppointment.patientCity = values.patientCity;
            patientAppointment.patientEmail = values.patientEmail;
            patientAppointment.patientAge = values.patientAge;
            patientAppointment.patientSex = values.patientSex;
            patientAppointment.isFirstTime = values.isFirstTime;
            patientAppointment.commentBefore = values.commentBefore;
            patientAppointment.commentAfter = values.commentAfter;
            patientAppointment.appointmentStatus = values.appointmentStatus;
            patientAppointment.appointmentDate = values.appointmentDate;
            patientAppointment.appointmentTime = values.appointmentTime;
            patientAppointment.bookingDate = values.bookingDate;
            dispatch((0, patientAppointmentSlice_1.updatePatientAppointment)(patientAppointment));
        }
        else {
            dispatch((0, patientAppointmentSlice_1.createPatientAppointment)(values));
        }
        console.log("Received values of form: ", values);
    };
    return (<antd_1.Layout style={{ backgroundColor: "#eeeae7" }}>
      <layout_1.Header style={{
            position: "sticky",
            top: 5,
            left: "5%",
            right: "5%",
            zIndex: 1,
            width: "90%",
            borderBottomLeftRadius: 20,
            height: 50,
            boxShadow: "-2px 2px #888888",
        }}>
        <div style={{
            position: "absolute",
            left: "0",
            backgroundColor: colors_1.blue[7],
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 20,
            width: "70%",
            height: "100%",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
        }}>
          <div style={{
            marginLeft: "5%",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5em",
        }}>
            DRNG | PATIENT
          </div>
        </div>
      </layout_1.Header>

      <layout_1.Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
        <div className="site-layout-background">
          <antd_1.Row gutter={[0, 16]} style={{ alignContent: "flex-start" }}>
            <antd_1.Col span={2} style={{ marginTop: 18 }}>
              <react_router_dom_1.Link to={"/"} style={{
            backgroundColor: "#eeeae7",
            border: "0",
        }}>
                <icons_1.ArrowLeftOutlined style={{ fontSize: "1.5em" }}></icons_1.ArrowLeftOutlined>
              </react_router_dom_1.Link>
            </antd_1.Col>
            <antd_1.Col span={7}>
              <h1>NEW RECORD</h1>
            </antd_1.Col>
            <antd_1.Col span={4}>
              <div style={{ width: 50, marginLeft: "10%", marginTop: 32 }}>
                <hr style={{ border: `1px solid ${colors_1.red[5]}` }}></hr>
              </div>
            </antd_1.Col>
          </antd_1.Row>
        </div>
        <div style={{ maxWidth: "80%", marginLeft: "10%" }}>
          <antd_1.Form layout="vertical" form={form} name="register" onFinish={onFinish} initialValues={Object.assign({}, patientAppointment)} scrollToFirstError>
            <h4>General Information</h4>
            <antd_1.Row gutter={[10, 16]}>
              <antd_1.Col span={3}>
                <antd_1.Form.Item name="uniqueCode" label="Unique Code" rules={[
            {
                required: false,
            },
        ]}>
                  <antd_1.Input disabled={true}/>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={5}>
                <antd_1.Form.Item name="patientName" label="Name" required={false} rules={[
            {
                required: true,
                message: "Please input the patient's name",
                whitespace: true,
            },
        ]}>
                  <antd_1.Input />
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="patientSex" label="Sex" required={false} rules={[{ required: true, message: "Please select gender!" }]}>
                  <antd_1.Select placeholder="select patient gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </antd_1.Select>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="patientPhone" label="Phone" required={false}>
                  <antd_1.InputNumber style={{ width: "100%" }}/>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="patientEmail" label="Email" required={false} rules={[
            {
                type: "email",
                message: "The input is not valid Email!",
            },
        ]}>
                  <antd_1.Input />
                </antd_1.Form.Item>
              </antd_1.Col>
            </antd_1.Row>
            <hr />

            <h4>Appointment Information</h4>
            <antd_1.Row gutter={[10, 16]}>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="appointmentDate" label="Appointment date" rules={[
            {
                required: true,
                message: "Please input the appointment date",
            },
        ]}>
                  <antd_1.DatePicker style={{ width: "100%" }}/>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="isFirstTime" label="First Time" required={false}>
                  <antd_1.Select>
                    <option value="false">No</option>
                    <option value="true">yes</option>
                  </antd_1.Select>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={5}>
                <antd_1.Form.Item name="bookingDate" label="Request date" required={false}>
                  <antd_1.DatePicker style={{ width: "100%" }}/>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="appointmentStatus" label="Appointment status" required={false}>
                  <antd_1.Select>
                    <option value="pending">Pending</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="passed">Passed</option>
                  </antd_1.Select>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={4}>
                <antd_1.Form.Item name="appointmentTime" label="Appointment time" required={false} rules={[
            {
                required: true,
                message: "Please input your appointment time!",
            },
        ]}>
                  <antd_1.TimePicker style={{ width: "100%" }}/>
                </antd_1.Form.Item>
              </antd_1.Col>
            </antd_1.Row>
            <h4>Address Information</h4>
            <antd_1.Row gutter={[10, 16]}>
              <antd_1.Col span={5}>
                <antd_1.Form.Item name="patientAddress" label="Address 1" required={false}>
                  <antd_1.Input />
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={3}>
                <antd_1.Form.Item name="patientCity" label="City" required={false}>
                  <antd_1.Input />
                </antd_1.Form.Item>
              </antd_1.Col>
            </antd_1.Row>

            <h4>Notes</h4>
            <antd_1.Row gutter={[10, 16]}>
              <antd_1.Col span={6}>
                <antd_1.Form.Item name="commentBefore" label="Before appointment" required={false}>
                  <TextArea_1.default autoSize={{ minRows: 3, maxRows: 4 }}></TextArea_1.default>
                </antd_1.Form.Item>
              </antd_1.Col>
              <antd_1.Col span={6}>
                <antd_1.Form.Item name="commentAfter" label="After appointment" required={false}>
                  <TextArea_1.default autoSize={{ minRows: 3, maxRows: 4 }}></TextArea_1.default>
                </antd_1.Form.Item>
              </antd_1.Col>
            </antd_1.Row>

            <antd_1.Form.Item>
              <antd_1.Button style={{
            marginLeft: "80%",
            backgroundColor: colors_1.red[3],
            fontWeight: "bold",
        }} type="primary" htmlType="submit">
                Save
              </antd_1.Button>
            </antd_1.Form.Item>
          </antd_1.Form>
        </div>
      </layout_1.Content>
    </antd_1.Layout>);
};
exports.default = CDPatientAppointment;
function dispatch(arg0) {
    throw new Error("Function not implemented.");
}
