<?php

namespace App\Observers;

use App\Jobs\UpdateScoutImport;
use App\Models\Book;

class BookObserver
{
    /**
     * Handle the Book "created" event.
     */
    public function created(Book $book): void
    {
        event(new UpdateScoutImport());
    }

    /**
     * Handle the Book "updated" event.
     */
    public function updated(Book $book): void
    {
        event(new UpdateScoutImport());
    }

    /**
     * Handle the Book "deleted" event.
     */
    public function deleted(Book $book): void
    {
        event(new UpdateScoutImport());
    }

    /**
     * Handle the Book "restored" event.
     */
    public function restored(Book $book): void
    {
        event(new UpdateScoutImport());
    }

    /**
     * Handle the Book "force deleted" event.
     */
    public function forceDeleted(Book $book): void
    {
        event(new UpdateScoutImport());
    }
}
