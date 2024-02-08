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
        Schema::create('gad_activities', function (Blueprint $table) {
            $table->id();
            $table->string('activity_title');
            $table->string('activity_type'); // client focused or organization focused
            $table->string('attendance_male');
            $table->string('attendance_female');
            $table->string('total_actual_expenses');
            $table->string('total_attribution');
            $table->softDeletes();
            $table->timestamps();
            //this table is linked to expenditure_gad
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gad_activities');
    }
};
