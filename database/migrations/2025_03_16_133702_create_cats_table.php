<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cats', function (Blueprint $table) {
            $table->id(); // Clé primaire auto-incrémentée
            $table->string('name'); // Nom du chat
            $table->string('breed')->nullable(); // Race du chat (optionnel)
            $table->integer('age')->nullable(); // Âge du chat (optionnel)
            $table->text('description')->nullable(); // Description ou commentaires
            $table->timestamps(); // Crée automatiquement les colonnes created_at et updated_at
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cats');
    }
};
