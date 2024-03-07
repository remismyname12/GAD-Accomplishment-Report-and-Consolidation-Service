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
        Schema::create('mandates', function (Blueprint $table) {
            $table->id();
            $table->string('gender_issue', 1000)->unique();
            $table->string('cause_of_gender_issue', 1000);
            $table->string('gad_result_statement', 1000);
            $table->string('gad_activity', 1000);
            $table->string('performance_indicators', 1000);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mandates');
    }
};
