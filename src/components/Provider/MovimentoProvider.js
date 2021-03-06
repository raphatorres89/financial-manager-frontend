import Api from '../../utils/Api';

const api = {
  async findAll(mes, ano) {
    try {
      const response = await Api.get(`/movimentos?year=${ano}&month=${mes}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  async save(values) {
    try {
      const response = await Api.post('/movimentos', { ...values });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  async update(id, values) {
    try {
      const response = await Api.put(`/movimentos/${id}`, { ...values });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(id) {
    try {
      await Api.delete(`/movimentos/${id}`);
    } catch (err) {
      console.log(err);
    }
  },
};

export default api;
