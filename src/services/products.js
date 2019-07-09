// @flow
import { requestServices } from 'services';

const fetchProducts = (query) => {
  const params = {
    ...(query && {query})
  }
  return requestServices.customAxios.get('/products/', {params}).then(res => res.data);
}
const createProduct = (data) => {
  return requestServices.customAxios.post('/products/', data).then(res => res.data);
}

const deleteProduct = (data) => {
  return requestServices.customAxios.delete('/products/', {data}).then(res => res.data);
}


export default {
  fetchProducts,
  createProduct,
  deleteProduct
};
