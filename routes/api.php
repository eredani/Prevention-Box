<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => 'v1'
], function () {
    Route::get('questions', 'API@getQuestions');
    Route::group([
    'middleware' => 'auth:api'
    ], function() {
        Route::post('question', 'API@addQuestion');
        Route::post('delquestion', 'API@delQuestion');
        Route::post('editquestion', 'API@editQuestion');
    });
});

    Route::group([
        'prefix' => 'auth'
    ], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('user', 'AuthController@user');
        Route::get('logout', 'AuthController@logout');
        
    });
});