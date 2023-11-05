<?php

namespace Database\Seeders;

use App\Events\UpdateScoutImport;
use App\Models\Book;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Book::factory(50)->create();
        $resp = Http::get('https://fakerapi.it/api/v1/books?_quantity=1000');
        $data = json_decode($resp->body(), true);
        $books = $data['data'];
        Book::insert(array_map(function ($book) {
            unset($book['id']);
            return $book;
        }, $books));
        Book::query()->searchable();
        event(new UpdateScoutImport());
    }
}
