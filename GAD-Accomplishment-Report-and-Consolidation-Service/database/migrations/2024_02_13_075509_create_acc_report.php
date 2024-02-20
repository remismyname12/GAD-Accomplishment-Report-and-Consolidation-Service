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
            $table->string('title');
            $table->string('date_of_activity');
            $table->string('venue');
            $table->string('no_of_participants');
            $table->string('male_participants');
            $table->string('female_participants');
            $table->string('fund_source');
            $table->string('clientele_type');
            $table->string('clientele_number');
            $table->string('actual_cost');
            $table->string('cooperating_agencies_u  nits');
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
