<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminEmployeeController;

// ---------------- Admin Routes ----------------
Route::prefix('admins')->group(function () {
    // CRUD for Admins
    Route::get('/', [AdminController::class, 'index']);
    Route::post('/', [AdminController::class, 'store']);
    Route::get('/{id}', [AdminController::class, 'show']);
    Route::put('/{id}', [AdminController::class, 'update']);
    Route::delete('/{id}', [AdminController::class, 'destroy']);

    // Authentication
    Route::post('/signin', [AdminController::class, 'sign_in']); // Login

    // Password reset
    Route::post('/forgot-password', [AdminController::class, 'forgotPassword']);
    Route::post('/reset-password', [AdminController::class, 'resetPassword']);
    Route::post('/verify-reset-code', [AdminController::class, 'verifyResetCode']);
});

// ---------------- Employee Routes (Admin access) ----------------
Route::prefix('admin/employees')->group(function () {
    Route::get('/', [AdminEmployeeController::class, 'index']);
    Route::post('/', [AdminEmployeeController::class, 'store']);
    Route::get('/{id}', [AdminEmployeeController::class, 'show']);
    Route::put('/{id}', [AdminEmployeeController::class, 'update']);
    Route::delete('/{id}', [AdminEmployeeController::class, 'destroy']);
});

// ---------------- Employee Self-Service Routes ----------------
Route::prefix('employees')->group(function () {
    // Get currently logged-in employee profile
    Route::get('/me', [AdminEmployeeController::class, 'currentEmployeeProfile']); 

    // Update logged-in employee profile
    Route::post('/me/update', [AdminEmployeeController::class, 'updateProfile']); 

    // Optionally: get employee by ID (if needed)
    Route::get('/{id}', [AdminEmployeeController::class, 'show']); 
});

// ---------------- Authenticated User (Sanctum) ----------------
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
