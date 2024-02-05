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

        $form_inset = [
            [
                'id' => '1',
                'user_id' => '1',
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

        DB::table('expenditure_inset')->insert($form_inset);
    }
}
