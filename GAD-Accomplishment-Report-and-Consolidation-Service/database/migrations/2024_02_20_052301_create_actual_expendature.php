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
        Schema::create('actual_expendature', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accReport_id')->constrained('forms')->onDelete('cascade');
            $table->string('type')->default('OTHERS');
            $table->string('items');
            $table->string('remarks');
            $table->string('source_of_funds');
            $table->string('actual_cost');
            $table->string('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actual_expendature');
    }
};
