<?php

Route::get('/{p1?}/{p2?}/{p3?}', function () {
    return view('welcome');
});