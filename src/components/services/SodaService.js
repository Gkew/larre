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

const findByName = (name) => {
  return http.get(`/sodas?name=${name}`);
};
const SodaService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
export default SodaService;
