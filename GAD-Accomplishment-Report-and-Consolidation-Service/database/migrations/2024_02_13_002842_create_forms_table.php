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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            //employee
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('form_type')->default('FORM');
            $table->string('title')->unique();
            $table->string('purpose');
            $table->string('legal_bases');
            $table->string('date_of_activity');
            $table->string('venue');
            $table->string('participants')->nullable();
            $table->string('no_of_target_participants')->nullable();
            $table->string('learning_service_providers')->nullable();
            $table->string('expected_outputs');
            $table->string('fund_source');

            //inset ---> has no unique columns
           
            //research/EAD
            $table->string('clientele_type')->nullable();
            $table->string('clientele_number')->nullable();
            $table->string('estimated_cost')->nullable();
            $table->string('cooperating_agencies_units')->nullable();
            $table->string('proponents_implementors');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
