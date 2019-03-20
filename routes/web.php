<?php

Route::get('/{p1?}/{p2?}/{p3?}', function () {
    return view('welcome');
});
Route::post('/api/v1/submit','API@submitQuiz')->middleware('guest');