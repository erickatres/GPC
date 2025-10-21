<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // for authentication
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class Employee extends Authenticatable
{
    use HasFactory, HasApiTokens;

    // Table name (optional if it follows Laravel convention)
    protected $table = 'employees';

    // Fields that can be mass-assigned
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'suffix_name',
        'address',
        'contact_number',
        'gender',
        'civil_status',
        'date_of_birth',
        'email',
        'employee_id',
        'department',
        'designation',
        'role',
        'employment_type',
        'sss_number',
        'pagibig_number',
        'tin_number',
        'date_of_joining',
        'date_of_leaving',
        'emergency_contact',
        'educational_background',
        'signature',
        'profile_image',
        'pds',
        'service_record',
        'registered_face',
        'signature_base64',
        'profile_image_base64',
        'registered_face_base64',
        'status',
        'password',
    ];

    // Fields that should be hidden in API responses
    protected $hidden = [
        'password',
    ];

    // Type casting for date fields
    protected $casts = [
        'date_of_birth' => 'date',
        'date_of_joining' => 'date',
        'date_of_leaving' => 'date',
    ];

    // Automatically hash password when setting it
    public function setPasswordAttribute($value)
    {
        if ($value) {
            $this->attributes['password'] = Hash::make($value);
        }
    }

    // Full name accessor
    public function getFullNameAttribute()
    {
        return trim("{$this->first_name} {$this->middle_name} {$this->last_name} {$this->suffix_name}");
    }

    // Example relationship with Department (if you have a Department model)
    public function departmentRelation()
    {
        return $this->belongsTo(Department::class, 'department');
    }

    // Scope for active employees
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    // Scope for role
    public function scopeRole($query, $role)
    {
        return $query->where('role', $role);
    }

    // Accessor for profile image URL
    public function getProfileImageUrlAttribute()
    {
        return $this->profile_image ? asset('storage/' . $this->profile_image) : asset('images/profile_picture.png');
    }
}
