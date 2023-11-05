<?php

namespace App\Listeners;

use App\Events\UpdateScoutImport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Artisan;

class UpdateScoutImportListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UpdateScoutImport $event): void
    {
        Artisan::call("scout:flush Book");
        Artisan::call("scout:import Book");
    }
}
