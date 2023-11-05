## Requirements

-   Laravel 10
-   node js
-   mielisearch

## Initial Commands

    > composer install
    > npm i
    > php artisan key:generate
    > php artisan migrate
    > php artisan passport:install
    > npm run react-build (or start client by npm start)

## Important

-   To create build use the below command
    > npm run react-build
-   Admin and sample books can be added using below command
    > php artisan db:seed
-   Default admin details: email: admin@mail.com, password: 123456

## API Documentation

-   Login: login via customer or admin

    > /api/v1/login
    > POST
    > [ email, password ]

-   Register: register for customer
    > /api/v1/register
    > POST
    > [ name, email, password ]
-   logout: logout for customer and admin

    > /api/v1/register
    > POST

-   get books: fetch books by filters
    > /api/v1/books
    > GET
    > [ page, search, order, publishedYear, genre, quantity ]
-   search books: search book by meilisearch
    > /api/v1/books/search
    > GET
    > [ search ]
-   books filters: get genre and published date filter options
    > /api/v1/books/filters
    > GET
-   add book: add book (only admin)
    > /api/v1/books
    > POST
    > [ title, author, genre, description, published, isbn, isbn ]
-   update book: update book (only admin)
    > /api/v1/books/{bookId}
    > PUT
    > [ title, author, genre, description, published, isbn, isbn ]
-   delete book: delete book (only admin)
    > /api/v1/books/{bookId}
    > DELETE
