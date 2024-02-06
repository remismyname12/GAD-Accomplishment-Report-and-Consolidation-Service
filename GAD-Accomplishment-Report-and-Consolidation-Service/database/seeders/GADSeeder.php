<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GADSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gad_activities = [
            [
                'id' => '1',
                'activity_title' => 'Training 1',
                'activity_type' => 'Client-Focused',
                'attendance_male' => '221',
                'attendance_female' => '382',
                'total_actual_expenses' => 'Php 1,500,000',
                'total_attribution' => 'Php 99,000',
            ],

            [
                'id' => '2',
                'activity_title' => 'Training 2',
                'activity_type' => 'Organization-Focused',
                'attendance_male' => '221',
                'attendance_female' => '382',
                'total_actual_expenses' => 'Php 1,500,000',
                'total_attribution' => 'Php 99,000',
            ],

            [
                'id' => '3',
                'activity_title' => 'Training 3',
                'activity_type' => 'Client-Focuses',
                'attendance_male' => '221',
                'attendance_female' => '382',
                'total_actual_expenses' => 'Php 1,500,000',
                'total_attribution' => 'Php 99,000',
            ],
        ];

        DB::table('gad_activities')->insert($gad_activities);

        $expenditure_gad = [
            [
                'id' => '1',
                'expenditure' => 'Snacks and lunch',
                'actual_expenses' => 'Php 10000',
                'attribution' => 'Php 9000',
            ],

            [
                'id' => '2',
                'expenditure' => 'Venue',
                'actual_expenses' => 'Php 9990',
                'attribution' => 'Php 544',
            ],

            [
                'id' => '3',
                'expenditure' => 'Transportation',
                'actual_expenses' => 'Php 15000',
                'attribution' => 'Php 8882',
            ],

        ];

        DB::table('expenditure_gad')->insert($expenditure_gad);
    }
}
