import React, { useState } from 'react';

interface CrudOperationsProps {
  onCreate: (product: any) => void;
}

const CrudOperations: React.FC<CrudOperationsProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    const newProduct = { title, price: parseFloat(price), category };
    onCreate(newProduct);
    setTitle('');
    setPrice('');
    setCategory('');
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="border p-2 mr-2"
      />
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add Product
      </button>
    </div>
  );
};

export default CrudOperations;
