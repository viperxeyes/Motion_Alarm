import api from "./api";

const GetSensorState = "/GetSensorState";
const Arm = "/Arm";

const getSensorState = () => api.get(GetSensorState);
const arm = () => api.post(Arm);

export default {
  getSensorState,
  arm,
};
