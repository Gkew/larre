import http from "../../http-common";
import Gps from "../Camera/Gps";

const getAll = () => {
  return http.get("/sodas");
};
const get = (id) => {
  return http.get(`/sodas/${id}`);
};
const create = (data) => {
  return http.post("/sodas/", data);
};
const update = (id, data) => {
  return http.patch(`/sodas/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/sodas/${id}`);
};

const gettAllCategories = () => {
  return http.get("/categories");
};

const createCategory = (data) => {
  return http.post("/categories", data);
};

const createPicture = (data, sodasID) => {
  return http.post("/pictures");
};
const getOnePicture = (id) => {
  return http.get(`/pictures/${id}`);
};
const SodaService = {
  getAll,
  get,
  create,
  update,
  remove,
  gettAllCategories,
  createCategory,
  createPicture,
  getOnePicture,
};
export default SodaService;
