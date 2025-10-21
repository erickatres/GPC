<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AdminEmployeeController extends Controller
{
    // 🔹 Get all employees
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees, 200);
    }

    // 🔹 Create a new employee
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'suffix_name' => 'nullable|string',
            'address' => 'nullable|string',
            'contact_number' => 'required|string',
            'gender' => 'required|string',
            'civil_status' => 'required|string',
            'date_of_birth' => 'required|date',
            'email' => 'required|email|unique:employees',
            'employee_id' => 'required|string|unique:employees',
            'department' => 'required|string',
            'designation' => 'required|string',
            'role' => 'nullable|string',
            'employment_type' => 'required|string',
            'sss_number' => 'required|string',
            'pagibig_number' => 'required|string',
            'tin_number' => 'required|string',
            'date_of_joining' => 'required|date',
            'date_of_leaving' => 'nullable|date',
            'emergency_contact' => 'nullable|string',
            'educational_background' => 'nullable|string',
            'status' => 'nullable|string',
            'password' => 'required|string|min:6',

            // file inputs
            'profile_image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'signature' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'pds' => 'nullable|file|mimes:pdf|max:4096',
            'service_record' => 'nullable|file|mimes:pdf|max:4096',
            'registered_face' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // 🔸 Handle file uploads
        $uploads = [];
        $base64Images = [];
        foreach (['profile_image', 'signature', 'pds', 'service_record', 'registered_face'] as $field) {
            if ($request->hasFile($field)) {
                $uploads[$field] = $request->file($field)->store('employees', 'public');
                // Convert to base64
                $base64Images[$field . '_base64'] = base64_encode(file_get_contents($request->file($field)));
            }
        }

        // 🔸 Create employee
        $employee = Employee::create([
            ...$validated,
            ...$uploads,
            ...$base64Images, // Add base64 fields
            'role' => $validated['role'] ?? 'Employee',
            'status' => $validated['status'] ?? 'Active',
            'password' => Hash::make($validated['password']),
            'profile_image' => $uploads['profile_image'] ?? '/images/profile_picture.png',
        ]);

        return response()->json([
            'message' => 'Employee created successfully',
            'employee' => $employee,
        ], 201);
    }

    // 🔹 Show specific employee
    public function show($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
        return response()->json($employee, 200);
    }

    // 🔹 Update employee
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $validated = $request->validate([
            'first_name' => 'sometimes|required|string',
            'last_name' => 'sometimes|required|string',
            'middle_name' => 'nullable|string',
            'suffix_name' => 'nullable|string',
            'address' => 'nullable|string',
            'contact_number' => 'sometimes|required|string',
            'gender' => 'sometimes|required|string',
            'civil_status' => 'sometimes|required|string',
            'date_of_birth' => 'sometimes|required|date',
            'email' => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'employee_id' => 'sometimes|required|string|unique:employees,employee_id,' . $employee->id,
            'department' => 'sometimes|required|string',
            'designation' => 'sometimes|required|string',
            'role' => 'nullable|string',
            'employment_type' => 'sometimes|required|string',
            'sss_number' => 'sometimes|required|string',
            'pagibig_number' => 'sometimes|required|string',
            'tin_number' => 'sometimes|required|string',
            'date_of_joining' => 'sometimes|required|date',
            'date_of_leaving' => 'nullable|date',
            'emergency_contact' => 'nullable|string',
            'educational_background' => 'nullable|string',
            'status' => 'nullable|string',
            'password' => 'nullable|string|min:6',

            // files
            'profile_image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'signature' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'pds' => 'nullable|file|mimes:pdf|max:4096',
            'service_record' => 'nullable|file|mimes:pdf|max:4096',
            'registered_face' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // 🔸 Handle new file uploads + base64
        foreach (['profile_image', 'signature', 'pds', 'service_record', 'registered_face'] as $field) {
            if ($request->hasFile($field)) {
                // delete old file if exists
                if ($employee->$field && Storage::disk('public')->exists($employee->$field)) {
                    Storage::disk('public')->delete($employee->$field);
                }
                $employee->$field = $request->file($field)->store('employees', 'public');
                // base64
                $employee->{$field . '_base64'} = base64_encode(file_get_contents($request->file($field)));
            }
        }

        // 🔸 Update other fields
        foreach ($validated as $key => $value) {
            if ($key === 'password' && $value) {
                $employee->password = Hash::make($value);
            } else {
                $employee->$key = $value;
            }
        }

        $employee->save();

        return response()->json([
            'message' => 'Employee updated successfully',
            'employee' => $employee,
        ], 200);
    }

    // 🔹 Delete employee
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        // delete uploaded files if any
        foreach (['profile_image', 'signature', 'pds', 'service_record', 'registered_face'] as $field) {
            if ($employee->$field && Storage::disk('public')->exists($employee->$field)) {
                Storage::disk('public')->delete($employee->$field);
            }
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }

    // 🔹 Face recognition
    public function recognizeFace(Request $request)
    {
        $request->validate([
            'face_image' => 'required|string', // base64 string
        ]);

        $faceBase64 = $request->face_image;

        // Save temporary file
        $tempFile = storage_path('app/temp_face.jpg');
        file_put_contents($tempFile, base64_decode($faceBase64));

        // Get all employees and their registered_face_base64
        $employees = Employee::all();

        $matches = [];
        foreach ($employees as $employee) {
            if ($employee->registered_face_base64) {
                $result = $this->compareFaces($tempFile, $employee->registered_face_base64);
                if ($result) {
                    $matches[] = $employee;
                }
            }
        }

        if (count($matches) > 0) {
            return response()->json(['match' => $matches[0]], 200);
        }

        return response()->json(['message' => 'No match found'], 404);
    }

    // 🔹 Compare faces helper (placeholder)
    private function compareFaces($file1, $base64Image)
    {
        // You can call a Python API here or use a PHP face recognition library
        // Example: send $file1 and decode $base64Image to Python service
        // Return true if match, false otherwise

        // Decode base64 to temporary file
        $tempFile2 = storage_path('app/temp_compare.jpg');
        file_put_contents($tempFile2, base64_decode($base64Image));

        // TODO: Call Python face recognition microservice
        // Example: return true if faces match
        return false;
    }
}
