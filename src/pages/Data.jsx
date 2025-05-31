import { useEffect, useState } from 'react';

export default function Data() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', number: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const downloadPdf = () => {
    fetch('http://localhost:3000/data/download-pdf')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => alert('Error downloading PDF: ' + err.message));
  };

  const downloadCsv = () => {
    fetch('http://localhost:3000/data/download-csv')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => alert('Error downloading CSV: ' + err.message));
  };

  const fetchData = () => {
    fetch('http://localhost:3000/data')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message));
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/data/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditForm({ name: item.name, email: item.email, number: item.number });
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error('Failed to update');
      setEditId(null);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto bg-gray-400 min-h-screen m-10 rounded-2xl">

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Data from MongoDB</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={downloadPdf}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Download PDF
        </button>
        <button
          onClick={downloadCsv}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow-lg">
        <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data.map((item, idx) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 transition"
              >
                <td className="border px-3 py-2 text-center">{idx + 1}</td>

                <td className="border px-3 py-2">
                  {editId === item._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded focus:ring"
                    />
                  ) : (
                    item.name
                  )}
                </td>

                <td className="border px-3 py-2">
                  {editId === item._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded focus:ring"
                    />
                  ) : (
                    item.email
                  )}
                </td>

                <td className="border px-3 py-2">
                  {editId === item._id ? (
                    <input
                      type="number"
                      name="number"
                      value={editForm.number}
                      onChange={handleInputChange}
                      className="w-full border px-2 py-1 rounded focus:ring"
                    />
                  ) : (
                    item.number
                  )}
                </td>

                <td className="border px-3 py-2 space-x-2 text-center">
                  {editId === item._id ? (
                    <>
                      <button
                        onClick={() => submitEdit(item._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
