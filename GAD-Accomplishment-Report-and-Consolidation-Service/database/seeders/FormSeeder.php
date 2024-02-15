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
        //Acccomplishment Report
        /*$acc_report = [
            [
                'id' => '1',
                'forms_id' => '3',
                'expenditures_id' => '3',
            ],

            [
                'id' => '2',
                'forms_id' => '2',
                'expenditures_id' => '3',
            ],

            [
                'id' => '3',
                'forms_id' => '1',
                'expenditures_id' => '1',
            ],
        ];*/

        //DB::table('acc_report')->insert($acc_report);
        

        $forms = [
            [
                'id' => '1',
                'user_id' => '1',
                'form_type' => 'INSET',
                'title' => 'Training 1',
                'purpose' => 'For World Peace',
                'legal_bases' => 'LEGALITY',
                'date_of_activity' => '3-27-2024',
                'venue' => 'LSU Gym',
                'participants' => 'STUDENTS',
                'no_of_target_participants' => '100',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                //res
                'fund_source' => 'BSU',
                'clientele_type' => 'BSU',
                'clientele_number' => 'BSU',
                'estimated_cost' => 'BSU',
                'cooperating_agencies_units' => 'BSU',
                'proponents_implementors' => 'BSU',
            ],

            [
                'id' => '2',
                'user_id' => '2',
                'form_type' => 'EMPLOYEE',
                'title' => 'Training 2',
                'purpose' => 'For World Peace',
                'legal_bases' => 'LEGALITY',
                'date_of_activity' => '3-27-2024',
                'venue' => 'LSU Gym',
                'participants' => 'STUDENTS',
                'no_of_target_participants' => '100',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                //res
                'fund_source' => 'BSU',
                'clientele_type' => 'BSU',
                'clientele_number' => 'BSU',
                'estimated_cost' => 'BSU',
                'cooperating_agencies_units' => 'BSU',
                'proponents_implementors' => 'BSU',
            ],

            [
                'id' => '3',
                'user_id' => '3',
                'form_type' => 'EAD',
                'title' => 'Training 3',
                'purpose' => 'For World Peace',
                'legal_bases' => 'LEGALITY',
                'date_of_activity' => '3-27-2024',
                'venue' => 'LSU Gym',
                'participants' => 'STUDENTS',
                'no_of_target_participants' => '100',
                'learning_service_providers' => 'INSTRUCTOR 1',
                'expected_outputs' => 'OUTPUT',
                //res
                'fund_source' => 'BSU',
                'clientele_type' => 'BSU',
                'clientele_number' => 'BSU',
                'estimated_cost' => 'BSU',
                'cooperating_agencies_units' => 'BSU',
                'proponents_implementors' => 'BSU',
            ],
        ];

        DB::table('forms')->insert($forms);

        $expenditures = [
            [
                'id' => '1',
                'forms_id' => '1',
                'items' => 'Apples',
                'per_head_per_day' => '2X500',
                'estimated_cost' => '300,000',
                'remarks' => 'DOLE',
                'source_of_funds' => 'DOLE',
                'total' => '1000',
            ],

            [
                'id' => '2',
                'forms_id' => '2',
                'items' => 'Banana',
                'per_head_per_day' => '2X100',
                'estimated_cost' => '300,000',
                'remarks' => 'DOLE',
                'source_of_funds' => 'DOLE',
                'total' => '200',
            ],

            [
                'id' => '3',
                'forms_id' => '3',
                'items' => 'Citrus',
                'per_head_per_day' => '2X300',
                'estimated_cost' => '300,000',
                'remarks' => 'DOLE',
                'source_of_funds' => 'DOLE',
                'total' => '600',
            ],
        ];

        DB::table('expenditures')->insert($expenditures);

    }
}
