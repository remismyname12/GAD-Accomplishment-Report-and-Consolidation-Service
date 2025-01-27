<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $form_employee = [
            [
                'id' => '1',
                'user_id' => '1',
                'form_type' => 'employee',
                'title' => 'Training 1',
                'purpose' => 'For Compliance',
                'legal_bases' => 'LEGALITY',
                'date_of_activity' => '1-25-2024',
                'venue' => 'BSU Gym',
                'participants' => 'STUDENTS',
                'no_of_target_participants' => '100',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                'fund_source' => 'BSU',
            ],

            [
                'id' => '2',
                'user_id' => '2',
                'form_type' => 'employee',
                'title' => 'Training 2',
                'purpose' => 'For the horde',
                'legal_bases' => 'LEGALITY',
                'date_of_activity' => '2-26-2024',
                'venue' => 'US Gym',
                'participants' => 'EMPLOYEES',
                'no_of_target_participants' => '100',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                'fund_source' => 'BSU',
            ],

            [
                'id' => '3',
                'user_id' => '3',
                'form_type' => 'employee',
                'title' => 'Training 3',
                'purpose' => 'For World Peace',
                'legal_bases' => 'LEGALITY',
                'date_of_activity' => '3-27-2024',
                'venue' => 'LSU Gym',
                'participants' => 'STUDENTS',
                'no_of_target_participants' => '100',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                'fund_source' => 'BSU',
            ],
        ];

        DB::table('form_employee')->insert($form_employee);

        $form_inset = [
            [
                'id' => '1',
                'user_id' => '1',
                'form_type' => 'inset',
                'title' => 'Training 1',
                'purpose' => 'For Compliance',
                'legal_bases' => 'LEGALITY',
                'date_of_LEAD_activity' => '1-25-2024',
                'venue' => 'BSU Gym',
                'participants' => 'STUDENTS',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                'fund_source' => 'BSU',
            ],

            [
                'id' => '2',
                'user_id' => '2',
                'form_type' => 'inset',
                'title' => 'Training 2',
                'purpose' => 'For the horde',
                'legal_bases' => 'LEGALITY',
                'date_of_LEAD_activity' => '2-26-2024',
                'venue' => 'US Gym',
                'participants' => 'EMPLOYEES',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                'fund_source' => 'BSU',
            ],

            [
                'id' => '3',
                'user_id' => '3',
                'form_type' => 'inset',
                'title' => 'Training 3',
                'purpose' => 'For World Peace',
                'legal_bases' => 'LEGALITY',
                'date_of_LEAD_activity' => '3-27-2024',
                'venue' => 'LSU Gym',
                'participants' => 'STUDENTS',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                'fund_source' => 'BSU',
            ],
        ];

        DB::table('form_inset')->insert($form_inset);

        $xpenditure_e = [
            [
                'id' => '1',
                'form_id' => '1',
                'items' => 'Apples',
                'per_head_per_day' => '2X500',
                'total' => '1000',
            ],

            [
                'id' => '2',
                'form_id' => '2',
                'items' => 'Banana',
                'per_head_per_day' => '2X100',
                'total' => '200',
            ],

            [
                'id' => '3',
                'form_id' => '3',
                'items' => 'Citrus',
                'per_head_per_day' => '2X300',
                'total' => '600',
            ],
        ];

        DB::table('xpenditure_e')->insert($xpenditure_e);

        $xpenditure_i = [
            [
                'id' => '1',
                'form_id' => '1',
                'items' => 'Apples',
                'per_head_per_day' => '2X500',
                'total' => '1000',
            ],

            [
                'id' => '2',
                'form_id' => '2',
                'items' => 'Banana',
                'per_head_per_day' => '2X100',
                'total' => '200',
            ],

            [
                'id' => '3',
                'form_id' => '3',
                'items' => 'Citrus',
                'per_head_per_day' => '2X300',
                'total' => '600',
            ],
        ];

        DB::table('xpenditure_i')->insert($xpenditure_i);

    }
}
