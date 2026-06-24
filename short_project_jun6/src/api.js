const BASE_URL = 'http://localhost:4200/admin';

export const fetchBanners = async () => {
  const res = await fetch(`${BASE_URL}/banner`);
  return res.json();
};

export const uploadBannerImage = async (formData) => {
  const res = await fetch(`${BASE_URL}/banner/upload`, {
    method: 'POST',
    body: formData 
  });
  return res.json();
};

export const deleteBannerImage = async (index) => {
  const res = await fetch(`${BASE_URL}/banner/${index}`, {
    method: 'DELETE'
  });
  return res.json();
};

export const fetchServices = async () => {
  const res = await fetch(`${BASE_URL}/service`);
  return res.json();
};

export const createService = async (formData) => {
  const res = await fetch(`${BASE_URL}/service`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

export const updateService = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/service/${id}`, {
    method: 'PUT',
    body: formData
  });
  return res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${BASE_URL}/service/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};