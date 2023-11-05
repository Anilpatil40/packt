<?php

use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\BooksController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:api'])->name('logout');

Route::get('books/search', [BooksController::class, 'search'])->name('books.search');
Route::get('books/filters', [BooksController::class, 'filters'])->name('books.filters');
Route::resource('books', BooksController::class);
