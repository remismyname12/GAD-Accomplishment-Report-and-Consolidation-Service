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
            $table->string('form_id');
            $table->string('form_type');
            $table->string('title_of_activity');
            $table->string('date_of_activity');
            $table->string('venue');
            $table->string('proponents');
            $table->string('no_of_participants_male');
            $table->string('no_of_participants_female');
            $table->string('no_of_participants_total');
            $table->softDeletes();
            $table->timestamps();
            //this table is linked to expenditure_list
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
