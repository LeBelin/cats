import React from 'react';
import { Link } from '@inertiajs/react';
import CrudLayout from '@/layouts/crud-layout';
import { Cat } from '@/types/cat';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface IndexProps {
  cats: Cat[];
}

const Index: React.FC<IndexProps> = ({ cats }) => {
  const handleDelete = (id: number) => {
    if (confirm('Confirmez-vous la suppression de ce chat ?')) {
      router.delete(route('cats.destroy', id));
    }
  };

  return (
    <CrudLayout title="Liste des Chats">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">Chats</h2>
        <Link href={route('cats.create')}>
          <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Ajouter un chat
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cats.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">{cat.name}</h3>
              <p className="mt-2 text-gray-600">Race : {cat.breed || 'Non renseigné'}</p>
              <p className="mt-2 text-gray-600">Âge : {cat.age ?? 'Non renseigné'}</p>
            </div>
            <div className="px-6 py-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
              <div className="flex justify-between">
                <Link 
                  href={route('cats.show', cat.id)} 
                  className="flex items-center text-white font-semibold hover:underline"
                >
                  <Eye size={18} className="mr-1" />
                  <span>Voir</span>
                </Link>
                <Link 
                  href={route('cats.edit', cat.id)} 
                  className="flex items-center text-white font-semibold hover:underline"
                >
                  <Edit size={18} className="mr-1" />
                  <span>Modifier</span>
                </Link>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="flex items-center text-white font-semibold hover:underline"
                >
                  <Trash2 size={18} className="mr-1" />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CrudLayout>
  );
};

export default Index;
