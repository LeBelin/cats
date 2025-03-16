import React from 'react';
import { Link, router } from '@inertiajs/react';
import CrudLayout from '@/layouts/crud-layout';
import { Cat } from '@/types/cat';
import { Edit, Trash2 } from 'lucide-react';

interface ShowProps {
  cat: Cat;
}

const Show: React.FC<ShowProps> = ({ cat }) => {
  const handleDelete = () => {
    if (confirm('Confirmez-vous la suppression de ce chat ?')) {
      router.delete(route('cats.destroy', cat.id));
    }
  };

  return (
    <CrudLayout title="Détails du Chat">
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">{cat.name}</h2>
        <p className="mt-2">Race: {cat.breed || 'Non renseigné'}</p>
        <p className="mt-2">Âge: {cat.age ?? 'Non renseigné'}</p>
        <p className="mt-2">Description: {cat.description || 'Aucune description'}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        <Link 
          href={route('cats.edit', cat.id)}
          className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <Edit size={16} className="mr-1" />
          <span>Modifier</span>
        </Link>
        <button 
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Trash2 size={16} className="mr-1" />
          <span>Supprimer</span>
        </button>
        <Link 
          href={route('cats.index')}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <span>Retour</span>
        </Link>
      </div>
    </CrudLayout>
  );
};

export default Show;
