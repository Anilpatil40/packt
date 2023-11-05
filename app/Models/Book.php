<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Book extends Model
{
    use Searchable, HasFactory;

    protected $fillable = [
        'title',
        'author',
        'genre',
        'description',
        'isbn',
        'image',
        'published',
        'publisher',
    ];

    public $searchable = ['title', 'author', 'genre', 'isbn'];

    public function toSearchableArray(): array
    {
        return [
            'title' => $this->title,
            'author' => $this->author,
            'genre' => $this->genre,
            'isbn' => $this->isbn,
        ];
    }
}
