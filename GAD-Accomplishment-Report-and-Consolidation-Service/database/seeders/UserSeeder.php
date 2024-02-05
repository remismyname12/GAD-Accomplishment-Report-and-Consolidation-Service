<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
        [
            'user_id' => '1',
            'username' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$YOmO1o82p8a05a1lJxxGyeVVfYXEMdKbZQ5Ink9jqIYyYnqJFA2lm',
            'role' => 'admin',
        ],

        //staff
        [
            'user_id' => '2',
            'username' => 'staff',
            'email' => 'staff@gmail.com',
            'password' => '$2y$10$YOmO1o82p8a05a1lJxxGyeVVfYXEMdKbZQ5Ink9jqIYyYnqJFA2lm',
            'role' => 'staff',
            // Add more data as needed
        ],

        //college
        [
            'user_id' => '3',
            'username' => 'college',
            'email' => 'college@gmail.com',
            'password' => '$2y$10$YOmO1o82p8a05a1lJxxGyeVVfYXEMdKbZQ5Ink9jqIYyYnqJFA2lm',
            'role' => 'college',
            // Add more data as needed
        ]
        ];

        DB::table('users')->insert($users);
    }
}
