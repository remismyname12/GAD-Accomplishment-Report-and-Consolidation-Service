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
        Schema::create('form_research', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title')->unique();
            $table->string('date');
            $table->string('venue');
            $table->string('clientele_type');
            $table->string('clientele_number');
            $table->string('estimated_cost');
            $table->string('cooperating_agencies_units');
            $table->string('proponents_implementors');
            $table->string('fund_source');
            $table->string('expected_outputs');
            $table->string('form_type')->default('RESEARCH');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_research');
    }
};
