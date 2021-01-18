<?php

namespace Database\Seeders\Admins;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'name' => 'Korex',
            'email' => 'adeyanju@example.com',
            'password' => Hash::make('12131415')
        ]);
    }
}
