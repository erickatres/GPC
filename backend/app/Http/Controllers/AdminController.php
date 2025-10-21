<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{
    // 🔹 Get all employees (Admin only)
    public function index(Request $request)
    {
        // Check if admin is authenticated
        if (!$this->isAdmin($request)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $employees = Employee::all(['id', 'employee_id', 'email']);
        return response()->json($employees, 200);
    }

    // 🔹 Create a new employee account (Admin only)
    public function store(Request $request)
    {
        if (!$this->isAdmin($request)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'employee_id' => 'required|string|max:255|unique:employees',
            'email'       => 'required|email|unique:employees',
            'password'    => 'required|string|min:6',
        ]);

        $employee = Employee::create([
            'employee_id' => $validated['employee_id'],
            'email'       => $validated['email'],
            'password'    => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Employee created successfully',
            'employee' => [
                'id'          => $employee->id,
                'employee_id' => $employee->employee_id,
                'email'       => $employee->email,
            ]
        ], 201);
    }

    // 🔹 Sign in (Admin + Employee)
    public function sign_in(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
            'email'       => 'required|email',
            'password'    => 'required|string',
        ]);

        // ✅ Hardcoded admin credentials
        if (
            $request->email === 'treseniomia@gmail.com' &&
            $request->employee_id === '25-GPC-54321' &&
            $request->password === 'p@sw0rd'
        ) {
            return response()->json([
                'message' => 'Admin login successful',
                'role' => 'admin',
            ], 200);
        }

        // 🔹 Otherwise check employee table
        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('email', $request->email)
            ->first();

        if (!$employee || !Hash::check($request->password, $employee->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Employee login successful',
            'role' => 'employee',
            'employee' => $employee,
        ], 200);
    }

    // 🔹 Forgot password (Admin only)
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:admins,email',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        $resetCode = rand(1000, 9999);
        $admin->reset_code = $resetCode;
        $admin->save();

        try {
            Mail::raw("Your password reset code is: $resetCode", function ($message) use ($request) {
                $message->to($request->email)
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->subject('Password Reset Code');
            });

            return response()->json([
                'message' => 'Reset code sent to your email',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Mail not configured. Returning reset code for testing only.',
                'reset_code' => $resetCode
            ], 200);
        }
    }

    public function verifyResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:admins,email',
            'reset_code' => 'required|string',
        ]);

        $admin = Admin::where('email', $request->email)
            ->where('reset_code', $request->reset_code)
            ->first();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid reset code or email.'
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Reset code verified successfully.'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:admins,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin) {
            return response()->json(['message' => 'Admin not found.'], 404);
        }

        $admin->password = Hash::make($request->password);
        $admin->save();

        return response()->json(['message' => 'Password reset successful.'], 200);
    }

    // 🔹 Update employee (Admin only)
    public function update(Request $request, $id)
    {
        if (!$this->isAdmin($request)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $validated = $request->validate([
            'employee_id' => 'sometimes|required|string|max:255|unique:employees,employee_id,' . $employee->id,
            'email'       => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'password'    => 'sometimes|required|string|min:6',
        ]);

        $employee->employee_id = $validated['employee_id'] ?? $employee->employee_id;
        $employee->email = $validated['email'] ?? $employee->email;

        if (!empty($validated['password'])) {
            $employee->password = Hash::make($validated['password']);
        }

        $employee->save();

        return response()->json([
            'message' => 'Employee updated successfully',
            'employee' => $employee,
        ], 200);
    }

    // 🔹 Delete employee (Admin only)
    public function destroy(Request $request, $id)
    {
        if (!$this->isAdmin($request)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }

    // 🔹 Helper: Check if current credentials belong to admin
    private function isAdmin($request)
    {
        return $request->email === 'treseniomia@gmail.com' &&
               $request->employee_id === '25-GPC-54321' &&
               $request->password === 'p@sw0rd';
    }
}
