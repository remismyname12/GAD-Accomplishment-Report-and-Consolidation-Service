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
            $table->string('title')->unique();
            $table->string('date_of_activity');
            $table->string('venue');
            $table->string('proponents_implementors')->default('IMPLEMENTOR');
            $table->string('no_of_participants');
            $table->string('male_participants');
            $table->string('female_participants');
            $table->softDeletes();
            $table->timestamps();
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
