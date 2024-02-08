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
        Schema::create('form_employee', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('form_type')->default('EMPLOYEE');
            $table->string('title');
            $table->string('purpose');
            $table->string('legal_bases');
            $table->string('date_of_activity');
            $table->string('venue');
            $table->string('participants');
            $table->string('no_of_target_participants');
            $table->string('learning_service_providers');
            $table->string('expected_outputs');
            $table->string('fund_source');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_employee');
    }
};
