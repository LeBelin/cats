import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import CrudLayout from '@/layouts/crud-layout';
import { Cat } from '@/types/cat';

interface EditProps {
  cat: Cat;
}

const Edit: React.FC<EditProps> = ({ cat }) => {
  const { data, setData, put, errors } = useForm({
    name: cat.name,
    breed: cat.breed || '',
    age: cat.age ? String(cat.age) : '',
    description: cat.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('cats.update', cat.id));
  };

  return (
    <CrudLayout title="Modifier le Chat">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nom</label>
          <input 
            type="text" 
            className="border rounded p-2 w-full" 
            value={data.name} 
            onChange={(e) => setData('name', e.target.value)} 
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div>
          <label className="block text-gray-700">Race</label>
          <input 
            type="text" 
            className="border rounded p-2 w-full" 
            value={data.breed} 
            onChange={(e) => setData('breed', e.target.value)} 
          />
          {errors.breed && <span className="text-red-500 text-sm">{errors.breed}</span>}
        </div>
        <div>
          <label className="block text-gray-700">Âge</label>
          <input 
            type="number" 
            className="border rounded p-2 w-full" 
            value={data.age} 
            onChange={(e) => setData('age', e.target.value)} 
          />
          {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea 
            className="border rounded p-2 w-full" 
            value={data.description} 
            onChange={(e) => setData('description', e.target.value)}
          ></textarea>
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Enregistrer
          </button>
          <Link 
            href={route('cats.index')} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Annuler
          </Link>
        </div>
      </form>
    </CrudLayout>
  );
};

export default Edit;
