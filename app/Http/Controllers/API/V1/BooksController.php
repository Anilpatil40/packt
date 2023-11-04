<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BooksController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'auth.api.admin'])->except(['index', 'filters', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $quantity = $request->get('quantity');
        $page = $request->get('page');
        $genres = $request->get('genres');
        $publishedYears = $request->get('publishedYears');
        $search = $request->get('search');
        $books = Book::query();
        if ($request->get('order') == 'date.asc') {
            $books->orderBy('published', 'asc');
        } else if ($request->get('order') == 'date.desc') {
            $books->orderBy('published', 'desc');
        }
        if ($genres) {
            $books->whereIn('genre', explode('~', $genres));
        }
        if ($publishedYears) {
            $books->whereIn(DB::raw('YEAR(published)'), explode('~', $publishedYears));
        }
        if ($search) {
            $books->where('title', 'LIKE', "%$search%");
            $books->orWhere('author', 'LIKE', "%$search%");
            $books->orWhere('genre', 'LIKE', "%$search%");
        }
        $count = $books->count();
        $books->limit($quantity)->offset($quantity * ($page - 1));

        return response()->json([
            'status' => 'OK',
            'code' => 200,
            'total' => (int)$request->get('quantity'),
            'count' => $count,
            'data' => $books->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function filters()
    {
        $genres =
            Book::select('genre as filter', DB::raw('COUNT(*) as count'))
            ->groupBy('genre')
            ->get();

        $publishedYears = Book::select([
            DB::raw('YEAR(published) as filter'),
            DB::raw('COUNT(*) as count')
        ])
            ->groupBy('filter')
            ->orderBy('filter', 'desc')
            ->get();

        return response()->json([
            'status' => 'OK',
            'code' => 200,
            'data' => ['genres' => $genres, 'publishedYears' => $publishedYears],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'required|string',
            'isbn' => 'required|string|max:13|min:13',
            'publisher' => 'required|string',
            'published' => 'required|date',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = date("YmdHis") . "_" . uniqid() . "." . $file->extension();
            $file->storeAs('public/uploads', $fileName);
            $validatedData['image'] = "/storage/uploads/" . $fileName;
        }

        $book = new Book($validatedData);
        $book->save();

        return response()->json([
            'status' => 'OK',
            'code' => 200,
            'message' => 'Book added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'required|string',
            'isbn' => 'required|string|max:13|min:13',
            'publisher' => 'required|string',
            'published' => 'required|date',
        ]);

        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'status' => 'OK',
                'code' => 404,
                'message' => 'Book not found'
            ], 404);
        }

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = date("YmdHis") . "_" . uniqid() . "." . $file->extension();
            $file->storeAs('public/uploads', $fileName);
            $validatedData['image'] = "/storage/uploads/" . $fileName;
        }

        $book->update($validatedData);

        return response()->json([
            'status' => 'OK',
            'code' => 200,
            'message' => 'Book updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'status' => 'OK',
                'code' => 404,
                'message' => 'Book not found'
            ], 404);
        }

        $book->delete();

        return response()->json([
            'status' => 'OK',
            'code' => 200,
            'message' => 'Book updated successfully'
        ]);
    }
}
