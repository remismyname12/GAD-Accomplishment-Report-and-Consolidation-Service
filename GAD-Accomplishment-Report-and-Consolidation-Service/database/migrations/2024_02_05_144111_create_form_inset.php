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
        Schema::create('form_inset', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('form_type')->default('INSET');
            $table->string('title')->unique();
            $table->string('purpose');
            $table->string('legal_bases');
            $table->string('date_of_LEAD_activity');
            $table->string('venue');
            $table->string('participants');
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
        Schema::dropIfExists('form_inset');
    }
};
