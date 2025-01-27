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
        Schema::create('xpenditure_i', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained('form_inset')->onDelete('cascade'); //form_employee_id
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
        Schema::dropIfExists('xpenditure_i');
    }
};
