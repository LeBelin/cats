import React, { useState, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import CrudLayout from '@/layouts/crud-layout';
import { Cat } from '@/types/cat';
import { Eye, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface IndexProps {
  cats: Cat[];
}

const Index: React.FC<IndexProps> = ({ cats }) => {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredCats = useMemo(() => {
    let filtered = cats.filter(cat =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      (cat.breed && cat.breed.toLowerCase().includes(search.toLowerCase())) ||
      (cat.description && cat.description.toLowerCase().includes(search.toLowerCase()))
    );
    filtered.sort((a, b) => {
      let aValue = a[sortColumn as keyof Cat] || '';
      let bValue = b[sortColumn as keyof Cat] || '';
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      aValue = aValue.toString().toLowerCase();
      bValue = bValue.toString().toLowerCase();
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [cats, search, sortColumn, sortOrder]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Confirmez-vous la suppression de ce chat ?')) {
      router.delete(route('cats.destroy', id));
    }
  };

  return (
    <CrudLayout title="Liste des Chats">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-extrabold text-gray-800">Chats</h2>
        <div className="flex items-center space-x-4">
          <Link href={route('cats.create')}>
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Ajouter un chat
            </button>
          </Link>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="border rounded p-2"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
          <tr>
  <th
    className="py-3 px-4 bg-gray-100 text-gray-800 cursor-pointer text-left"
    onClick={() => handleSort('name')}
  >
    Nom
    {sortColumn === 'name' && (sortOrder === 'asc' ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />)}
  </th>
  <th
    className="py-3 px-4 bg-gray-100 text-gray-800 cursor-pointer text-left"
    onClick={() => handleSort('breed')}
  >
    Race
    {sortColumn === 'breed' && (sortOrder === 'asc' ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />)}
  </th>
  <th
    className="py-3 px-4 bg-gray-100 text-gray-800 cursor-pointer text-left"
    onClick={() => handleSort('age')}
  >
    Âge
    {sortColumn === 'age' && (sortOrder === 'asc' ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />)}
  </th>
  <th className="w-32 py-3 px-2 bg-gray-100 text-gray-800 text-left">
    Actions
  </th>
</tr>

          </thead>
          <tbody>
            {filteredCats.map(cat => (
              <tr key={cat.id} className="border-b transition-colors duration-300 ease-in-out hover:bg-blue-50">
              <td className="py-3 px-4">{cat.name}</td>
                <td className="py-3 px-4">{cat.breed || 'Non renseigné'}</td>
                <td className="py-3 px-4">{cat.age ?? 'Non renseigné'}</td>
                <td className="w-32 py-3 px-2">
                  <div className="px-2 py-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 rounded">
                    <div className="flex items-center justify-around">
                      <Link
                        href={route('cats.show', cat.id)}
                        className="flex items-center text-white text-xs hover:underline"
                      >
                        <Eye className="mr-0.5" />
                        <span>Voir</span>
                      </Link>
                      <Link
                        href={route('cats.edit', cat.id)}
                        className="flex items-center text-white text-xs hover:underline"
                      >
                        <Edit className="mr-0.5" />
                        <span>Mod.</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex items-center text-white text-xs hover:underline"
                      >
                        <Trash2 className="mr-0.5" />
                        <span>Suppr.</span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCats.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  Aucun résultat trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CrudLayout>
  );
};

export default Index;
