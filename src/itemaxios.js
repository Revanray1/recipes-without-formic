import axios from 'axios';
axios.defaults.baseURL = 'https://my-json-server.typicode.com/Revanray1/demo';
export const fetchitems = () => {
  const Allitems = axios.get('/data');
  return Allitems;
};

export const deleteitem = (e) => {
  const delitem = axios.delete(`/data/${e.id}`);
  return delitem;
};
export const addnewitem = (e) => {
  const newitem = axios.post('/data', e);
  return newitem;
};

export const updateitem = (e) => {
  //console.log(e)
  const upditem = axios.put(`/data/${e.id}`, e);
  // console.log(upditem);
  return upditem;
};
