import React, { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({ name: '', story: '', image: '', products: '', categories: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Send to backend
    const res = await fetch('http://localhost:5000/api/fabrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        products: form.products.split(',').map(p => p.trim()),
        categories: form.categories.split(',').map(c => c.trim()),
      })
    });
    if (res.ok) setMessage('Design uploaded!');
    else setMessage('Error uploading design.');
  };

  return (
    <div style={{ background: '#111', color: '#FFD700', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input name="name" placeholder="Fabric/Design Name" value={form.name} onChange={handleChange} required />
        <textarea name="story" placeholder="Story" value={form.story} onChange={handleChange} required />
        <input name="image" placeholder="Image URL or filename" value={form.image} onChange={handleChange} />
        <input name="products" placeholder="Products (comma separated)" value={form.products} onChange={handleChange} />
        <input name="categories" placeholder="Categories (comma separated)" value={form.categories} onChange={handleChange} />
        <button type="submit" style={{ background: '#FFD700', color: '#111', fontWeight: 'bold', padding: '0.5rem', border: 'none', borderRadius: 8 }}>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
