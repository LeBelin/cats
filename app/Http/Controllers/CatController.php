<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatController extends Controller
{
    /**
     * Affiche la liste de tous les chats.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $cats = Cat::all();

        return Inertia::render('cats/index', [
            'cats' => $cats,
        ]);
    }

    /**
     * Affiche le formulaire de création d'un nouveau chat.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('cats/create');
    }

    /**
     * Stocke un nouveau chat dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validation des données du formulaire
        $validatedData = $request->validate([
            'name'        => 'required|string|max:255',
            'breed'       => 'nullable|string|max:255',
            'age'         => 'nullable|integer',
            'description' => 'nullable|string',
        ]);

        // Création d'un nouveau chat avec assignation de masse
        Cat::create($validatedData);

        return redirect()->route('cats.index')->with('success', 'Chat créé avec succès!');
    }

    /**
     * Affiche les détails d'un chat spécifique.
     *
     * @param  \App\Models\Cat  $cat
     * @return \Inertia\Response
     */
    public function show(Cat $cat)
    {
        return Inertia::render('cats/show', [
            'cat' => $cat,
        ]);
    }

    /**
     * Affiche le formulaire d'édition d'un chat spécifique.
     *
     * @param  \App\Models\Cat  $cat
     * @return \Inertia\Response
     */
    public function edit(Cat $cat)
    {
        return Inertia::render('cats/edit', [
            'cat' => $cat,
        ]);
    }

    /**
     * Met à jour les informations d'un chat spécifique dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cat  $cat
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Cat $cat)
    {
        // Validation des données envoyées depuis le formulaire d'édition
        $validatedData = $request->validate([
            'name'        => 'required|string|max:255',
            'breed'       => 'nullable|string|max:255',
            'age'         => 'nullable|integer',
            'description' => 'nullable|string',
        ]);

        // Mise à jour du chat avec les données validées
        $cat->update($validatedData);

        return redirect()->route('cats.show', $cat)->with('success', 'Chat mis à jour avec succès!');
    }

    /**
     * Supprime un chat spécifique de la base de données.
     *
     * @param  \App\Models\Cat  $cat
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Cat $cat)
    {
        $cat->delete();

        return redirect()->route('cats.index')->with('success', 'Chat supprimé avec succès!');
    }
}
