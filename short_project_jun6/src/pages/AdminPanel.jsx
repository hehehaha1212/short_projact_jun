import { useState, useEffect } from 'react';
import { fetchBanners, uploadBannerImage, deleteBannerImage, fetchServices, createService, deleteService } from '../api.js';

const Dialog = ({ dialog, onConfirm, onClose }) => {
  if (!dialog.open) return null;

  const icons = {
    confirm: { bg: 'bg-red-100', text: 'text-red-600', symbol: '!' },
    success: { bg: 'bg-green-100', text: 'text-green-600', symbol: '✓' },
    error:   { bg: 'bg-red-100',  text: 'text-red-600',  symbol: '✕' },
  };
  const icon = icons[dialog.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <div className="flex items-start gap-3 mb-5">
          <div className={`w-9 h-9 rounded-full ${icon.bg} flex items-center justify-center flex-shrink-0`}>
            <span className={`${icon.text} text-lg font-bold`}>{icon.symbol}</span>
          </div>
          <div>
            <h3 className="font-bold text-[#021335] text-base">{dialog.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{dialog.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {dialog.type === 'confirm' ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#1A49C9] hover:bg-blue-800 transition-colors"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);

  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [dialog, setDialog] = useState({ open: false, type: '', title: '', message: '', onConfirm: null });

  const showConfirm = (title, message, onConfirm) =>
    setDialog({ open: true, type: 'confirm', title, message, onConfirm });
  const showSuccess = (title, message) =>
    setDialog({ open: true, type: 'success', title, message, onConfirm: null });
  const showError = (title, message) =>
    setDialog({ open: true, type: 'error', title, message, onConfirm: null });
  const closeDialog = () =>
    setDialog({ open: false, type: '', title: '', message: '', onConfirm: null });

  useEffect(() => {
    fetchBanners().then(data => data?.images && setBannerImages(data.images));
    fetchServices().then(data => Array.isArray(data) && setServices(data));
  }, []);

  const handleBannerUpload = async (e) => {
    e.preventDefault();
    if (!bannerFile) return showError('No file selected', 'Please select an image before uploading.');

    const formData = new FormData();
    formData.append('bannerImage', bannerFile);

    const data = await uploadBannerImage(formData);
    if (data?.images) {
      setBannerImages(data.images);
      setBannerFile(null);
      showSuccess('Banner uploaded', 'The new banner image has been added successfully.');
    } else {
      showError('Upload failed', data?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleDeleteBanner = (index) => {
    showConfirm(
      'Remove banner?',
      'This banner image will be permanently removed.',
      async () => {
        closeDialog();
        const data = await deleteBannerImage(index);
        if (data?.images) {
          setBannerImages(data.images);
        } else {
          showError('Delete failed', data?.error || 'Could not remove the banner.');
        }
      }
    );
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!title || !description) return showError('Missing fields', 'Title and description are required.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (iconFile) formData.append('iconFile', iconFile);
    if (imageFile) formData.append('imageFile', imageFile);

    const created = await createService(formData);
    if (created?._id) {
      setServices([...services, created]);
      setTitle('');
      setDescription('');
      setIconFile(null);
      setImageFile(null);
      showSuccess('Service added', `"${created.title}" has been added successfully.`);
    } else {
      showError('Failed to add service', created?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleDeleteService = (id, name) => {
    showConfirm(
      `Remove "${name}"?`,
      'This service will be permanently deleted.',
      async () => {
        closeDialog();
        const res = await deleteService(id);
        if (res.success) {
          setServices(services.filter(s => s._id !== id));
        } else {
          showError('Delete failed', res?.error || 'Could not remove the service.');
        }
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-slate-800">

      <Dialog dialog={dialog} onConfirm={dialog.onConfirm} onClose={closeDialog} />

      <h1 className="text-3xl font-extrabold mb-8 text-[#021335]">Admin Dashboard</h1>

      {/* Hero Banner Section */}
      <div className="bg-slate-50 border p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#1A49C9]">Hero Banners</h2>
        <form onSubmit={handleBannerUpload} className="flex gap-4 items-center">
          <input
            type="file" accept="image/*"
            onChange={e => setBannerFile(e.target.files[0])}
            className="border p-2 bg-white rounded-xl text-sm"
          />
          <button type="submit" className="bg-[#1A49C9] text-white px-5 py-2 rounded-xl font-bold text-sm">
            Upload
          </button>
        </form>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {bannerImages.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} alt="Banner Preview" className="h-24 w-full object-cover rounded-xl border bg-white" />
              <button
                onClick={() => handleDeleteBanner(i)}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-slate-50 border p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-[#1A49C9]">Manage Services</h2>
        <form onSubmit={handleCreateService} className="grid md:grid-cols-3 gap-4 items-end bg-white p-4 rounded-xl border">
          <div>
            <label className="block text-xs font-bold mb-1">Service Title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. Card Printing" />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Description</label>
            <input type="text" required value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. High quality prints..." />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Upload Icon</label>
            <input type="file" accept="image/*" onChange={e => setIconFile(e.target.files[0])} className="w-full border p-1 text-xs bg-slate-50 rounded-lg mb-2" />
            <label className="block text-xs font-bold mb-1">Upload Card Display Image</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full border p-1 text-xs bg-slate-50 rounded-lg" />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button type="submit" className="bg-[#1A49C9] text-white px-6 py-2 rounded-xl font-bold text-sm">
              Add Service
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-2">
          {services.map((s) => (
            <div key={s._id} className="flex justify-between items-center bg-white p-4 rounded-xl border">
              <div className="flex items-center gap-3">
                {s.icon && <img src={s.icon} alt="" className="w-8 h-8 object-contain" />}
                <div>
                  <h4 className="font-bold text-[#021335]">{s.title}</h4>
                  <p className="text-xs text-gray-500">{s.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteService(s._id, s.title)}
                className="text-red-600 font-bold text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;