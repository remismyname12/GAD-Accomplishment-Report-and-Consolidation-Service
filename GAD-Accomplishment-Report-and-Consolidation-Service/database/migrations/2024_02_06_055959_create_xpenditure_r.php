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
        Schema::create('xpenditure_r', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained('form_research')->onDelete('cascade'); //form_employee_id
            $table->string('type')->default('OTHERS');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xpenditure_r');
    }
};
