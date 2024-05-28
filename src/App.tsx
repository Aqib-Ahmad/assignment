import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';
import Table from './Table';
import CrudOperations from './CrudOperations';
import './App.css'
const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextId, setNextId] = useState<number>(1); 

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await getProducts();
      // console.log(response , 'response data fro api');
      
      const products = response.data.map((product: any, index: number) => ({
        ...product,
        localId: index + 1,
      }));
      setData(products);
      setNextId(products.length + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetching data', error);
    }
  };
// Here i create  

  const handleCreate = async (newProduct: any) => {
    try {
      console.log('newProduct' , newProduct);
      
      const productWithId = { ...newProduct, localId: nextId }; 
      const response = await createProduct(productWithId);
      setData([...data, { ...productWithId, id: response.data.id }]);
      setNextId(nextId + 1); 
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

// Here i handle update  

  const handleUpdate = async (localId: number, updatedProduct: any) => {
    try {
      const product = data.find(product => product.localId === localId);
      console.log(product);
      
      if (product) {
        await updateProduct(product.id, updatedProduct);
        setData(data.map(p => (p.localId === localId ? { ...p, ...updatedProduct } : p)));
      }
    } catch (error) {
      console.error('Error updating product', error);
    }
  };
// Here i handle delete 
  const handleDelete = async (localId: number) => {
    try {
      const product = data.find(product => product.localId === localId);
      if (product) {
        await deleteProduct(product.id);
        const newData = data.filter(p => p.localId !== localId).map((p, index) => ({
          ...p,
          localId: index + 1,
        }));
        setData(newData);
        setNextId(newData.length + 1); 
      }
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  if (loading) return <div className='bg-orange-700 text-center mt-80 p-2' >Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <CrudOperations onCreate={handleCreate} />
      <Table data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default App;
