<?php
    $files = collect(scandir(public_path()."/dist"));
    $fileName = $files->filter(function($fileName){
        return preg_match("/[0-9]+.bundle.js/", $fileName) && preg_replace("/[0-9]+.bundle.js/i", "", $fileName) == "";
    })->first();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{{ config('app.name') }}</title>
    </head>
    <body>
        <div id="root"></div>

        <!-- Notice we are pointing to `bundle.js` file -->
        <script src="{{ asset("dist/$fileName") }}"></script>
    </body>
</html>
