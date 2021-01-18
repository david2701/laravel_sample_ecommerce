<?php

use App\Http\Controllers\Admins\AdminsController;
use App\Http\Controllers\Admins\ItemsController;
use App\Http\Controllers\Admins\MembersController;
use Illuminate\Support\Facades\Route;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


################### Login ##############
Route::group(['prefix' => 'admins', 'namespace' => 'Admins'], function () {
    Route::post('login', [AdminsController::class, 'adminsLogin']);
});

################## getAuthAdmin ###################
Route::group(['prefix' => 'admins', 'namespace' => 'Admins', 'middleware' => ['adminsRoutes', 'jwt.auth']], function () {
    Route::get('authAdmin', [AdminsController::class, 'getAuthenticatedAdmin']);
});

################## items #############################
Route::group(['prefix' => 'admins', 'namespace' => 'Admins', 'middleware' => ['adminsRoutes', 'jwt.auth']], function () {
    Route::post('add/item/{id}', [ItemsController::class, 'addItem']);
    Route::get('get/items', [ItemsController::class, 'getItems']);
    Route::get('edit/item/{id}', [ItemsController::class, 'editItem']);
    Route::post('update/item/{id}', [ItemsController::class, 'updateItem']);
    Route::delete('delete/item/{id}', [ItemsController::class, 'deleteItem']);
});

################################## users ###################################
Route::group(['prefix' => 'admins', 'namespace' => 'Admins', 'middleware' => ['adminsRoutes', 'jwt.auth']], function () {
    Route::post('add/user', [MembersController::class, 'addUser']);
});
