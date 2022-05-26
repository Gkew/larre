import http from "../../http-common";

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

const getOrders = () => {
  return http.get("/orders");
};

const SodaService = {
  getAll,
  get,
  create,
  update,
  remove,
  gettAllCategories,
  createCategory,
  getOrders,
};
export default SodaService;
