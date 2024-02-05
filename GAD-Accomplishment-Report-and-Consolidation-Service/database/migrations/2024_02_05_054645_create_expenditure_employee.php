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
        Schema::create('expenditure_employee', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained('form_employee')->onDelete('cascade');
            $table->string('items');
            $table->string('per_head_per_day'); // store as COLLECTION
            $table->string('total');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenditure_employee');
    }
};
