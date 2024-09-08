<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Jabatan;

class JabatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "jabatan" => "HRD",
                "skala_level_id" => 1
            ],
            [
                "jabatan" => "Staff IT",
                "skala_level_id" => 3
            ],
            [
                "jabatan" => "Manager",
                "skala_level_id" => 2
            ]
        ];

        foreach ($data as $item) {
            Jabatan::create([
                "jabatan" => $item["jabatan"],
                "skala_level_id" => $item["skala_level_id"]
            ]);
        }
    }
}
