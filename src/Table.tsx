import React, { useState } from 'react';

interface TableProps {
  data: any[];
  onUpdate: (localId: number, product: any) => void;
  onDelete: (localId: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<any>({});

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const startEdit = (product: any) => {
    // console.log(product , 'product in Table');
    
    setEditId(product.localId);
    setEditProduct(product);
  };

  const saveEdit = () => {
    if (editId !== null) {
      onUpdate(editId, editProduct);
      setEditId(null);
      setEditProduct({});
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Local ID</th>
          <th className="py-2">Title</th>
          <th className="py-2">Price</th>
          <th className="py-2">Category</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(product => (
          <tr key={product.localId}>
            <td className="border px-4 py-2">{product.localId}</td>
            <td className="border px-4 py-2">
              {editId === product.localId ? (
                <input
                  name="title"
                  value={editProduct.title}
                  onChange={handleEditChange}
                  className="border p-2"
                />
              ) : (
                product.title
              )}
            </td>
            <td className="border px-4 py-2">
              {editId === product.localId ? (
                <input
                  name="price"
                  type="number"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  className="border p-2"
                />
              ) : (
                product.price
              )}
            </td>
            <td className="
            
            px-4 py-2">
              {editId === product.localId ? (
                <input
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                  className="border p-2"
                />
              ) : (
                product.category
              )}
            </td>
            <td className="border px-4 py-2">
              {editId === product.localId ? (
                <button
                  onClick={saveEdit}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(product)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.localId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
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
  );
};

export default Table;
