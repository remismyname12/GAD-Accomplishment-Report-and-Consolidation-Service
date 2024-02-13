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
                //'form_type' => 'employee',
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
                //'form_type' => 'employee',
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
                //'form_type' => 'employee',
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
                //'form_type' => 'inset',
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
                //'form_type' => 'inset',
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
                //'form_type' => 'inset',
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

        //Acccomplishment Report
        $acc_report = [
            [
                'id' => '1',
                'form_id' => '1',
                'form_type' => 'INSET',
                'title_of_activity' => 'Q',
                'date_of_activity' => 'Q',
                'venue' => 'Q',
                'proponents' => 'Q',
                'no_of_participants_male' => '10',
                'no_of_participants_female' => '15',
                'no_of_participants_total' => '25',
            ],

            [
                'id' => '2',
                'form_id' => '2',
                'form_type' => 'INSET',
                'title_of_activity' => 'W',
                'date_of_activity' => 'W',
                'venue' => 'W',
                'proponents' => 'W',
                'no_of_participants_male' => '200',
                'no_of_participants_female' => '200',
                'no_of_participants_total' => '400',
            ],

            [
                'id' => '3',
                'form_id' => '3',
                'form_type' => 'EMPLOYEE',
                'title_of_activity' => 'E',
                'date_of_activity' => 'E',
                'venue' => 'E',
                'proponents' => 'E',
                'no_of_participants_male' => '100',
                'no_of_participants_female' => '150',
                'no_of_participants_total' => '250',
            ],
        ];

        DB::table('acc_report')->insert($acc_report);

        $forms = [
            [
                'id' => '1',
                'user_id' => '1',
                'form_type' => 'inset',
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
                'form_type' => 'employee',
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
                'form_type' => 'ead',
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
                'form_id' => '1',
                'items' => 'Apples',
                'per_head_per_day' => '2X500',
                'estimated_cost' => '300,000',
                'remarks' => 'DOLE',
                'source_of_funds' => 'DOLE',
                'total' => '1000',
            ],

            [
                'id' => '2',
                'form_id' => '2',
                'items' => 'Banana',
                'per_head_per_day' => '2X100',
                'estimated_cost' => '300,000',
                'remarks' => 'DOLE',
                'source_of_funds' => 'DOLE',
                'total' => '200',
            ],

            [
                'id' => '3',
                'form_id' => '3',
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
