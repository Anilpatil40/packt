<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = User::where('email', 'admin@mail.com')->first();
        if (!$user) {
            User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'password' => Hash::make('123456'),
                'isAdmin' => true
            ]);
        }
        $this->call(BookSeeder::class);
    }
}
