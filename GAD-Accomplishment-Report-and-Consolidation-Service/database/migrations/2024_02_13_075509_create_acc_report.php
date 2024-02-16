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
        Schema::create('acc_report', function (Blueprint $table) {
            $table->id();
            $table->foreignId('forms_id')->constrained('forms')->onDelete('cascade');
            $table->foreignId('expenditures_id')->constrained('expenditures')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
            
            // Create a unique index on 'forms_id' and 'expenditures_id' combination
            $table->unique(['forms_id', 'expenditures_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acc_report');
    }
};
