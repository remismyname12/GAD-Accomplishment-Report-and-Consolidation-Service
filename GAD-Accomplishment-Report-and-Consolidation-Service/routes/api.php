<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    //Users
    Route::post('/adduser', [UserController::class, 'adduser']);
    Route::put('/updateuser/{id}', [UserController::class, 'updateuser']);
    Route::put('/archiveuser/{id}', [UserController::class, 'archiveuser']);
    Route::put('/restoreuser/{id}', [UserController::class, 'restoreuser']);
    Route::put('/deleteuser/{id}', [UserController::class, 'deleteuser']);
    Route::get('/showusers', [UserController::class, 'index']);
    Route::get('/showarchivedusers', [UserController::class, 'userarchiveindex']);
    
    //Forms
    Route::post('/form_employee', [FormController::class, 'form_employee_store']);
    Route::post('/form_inset', [FormController::class, 'form_inset_store']);

    //logout
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::post('/login', [AuthController::class, 'login']);



