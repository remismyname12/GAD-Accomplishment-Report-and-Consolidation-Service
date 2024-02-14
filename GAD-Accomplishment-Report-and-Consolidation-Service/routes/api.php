<?php

use App\Http\Controllers\AccomplishmentReportController;
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
    
    //Activity Forms Employee
    Route::post('/form_employee', [FormController::class, 'form_employee_store']);
    Route::get('/show_form_employee', [FormController::class, 'index_employee_forms']);
    Route::put('/update_form_employee/{id}', [FormController::class, 'form_employee_update']);
    
    //Activity Forms Inset
    Route::post('/form_inset', [FormController::class, 'form_inset_store']);
    Route::put('/update_form_inset/{id}', [FormController::class, 'form_inset_update']);
    Route::get('/show_form_inset', [FormController::class, 'indexInsetForms']);

    //Activity Forms EAD
    Route::post('/form_ead', [FormController::class, 'form_ead_store']);
    Route::get('/show_form_ead', [FormController::class, 'index_ead_form']);
    Route::get('/update_form_ead', [FormController::class, 'form_ead_update']);
  
    //Crud Functions
    Route::get('/show_archived_forms_all', [FormController::class, 'index_all_archived_forms']);
    Route::put('/archive_form/{id}', [FormController::class, 'form_archive']);
    Route::put('/restore_form/{id}', [FormController::class, 'form_restore']);
    Route::put('/delete_form/{id}', [FormController::class, 'form_delete']);
  
    //expenditure list
    Route::post('/xpenditure_i', [FormController::class, 'xpenditure_i_store']);

    Route::post('/accomplishment_report', [AccomplishmentReportController::class, 'accomplishment_report']);

    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::post('/login', [AuthController::class, 'login']);



