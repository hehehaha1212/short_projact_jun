const BASE_URL = 'http://localhost:4200';

export const fetchBanners = async () => {
  const res = await fetch(`${BASE_URL}/admin/banner`);
  return res.json();
};

export const uploadBannerImage = async (formData) => {
  const res = await fetch(`${BASE_URL}/admin/banner/upload`, {
    method: 'POST',
    body: formData 
  });
  return res.json();
};

export const deleteBannerImage = async (index) => {
  const res = await fetch(`${BASE_URL}/admin/banner/${index}`, {
    method: 'DELETE'
  });
  return res.json();
};

export const fetchServices = async () => {
  const res = await fetch(`${BASE_URL}/admin/service`);
  return res.json();
};

export const createService = async (formData) => {
  const res = await fetch(`${BASE_URL}/admin/service`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

export const updateService = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/admin/service/${id}`, {
    method: 'PUT',
    body: formData
  });
  return res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/service/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};

export const sendContactMessage = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};
 
export const fetchContactMessages = async () => {
  const res = await fetch(`${BASE_URL}/admin/contact`);
  return res.json();
};
 
export const markContactMessageRead = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/contact/${id}/read`, {
    method: 'PUT'
  });
  return res.json();
};
 
export const deleteContactMessage = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/contact/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};