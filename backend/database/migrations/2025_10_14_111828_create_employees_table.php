<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('suffix_name', 50)->nullable();
            $table->string('address')->nullable();
            $table->string('contact_number', 50);
            $table->string('gender', 20);
            $table->string('civil_status', 50);
            $table->date('date_of_birth');
            $table->string('email')->unique();
            $table->string('employee_id', 50)->unique();
            $table->string('department');
            $table->string('designation');
            $table->string('role', 50)->default('Employee');
            $table->string('employment_type');
            $table->string('sss_number', 50);
            $table->string('pagibig_number', 50);
            $table->string('tin_number', 50);
            $table->date('date_of_joining');
            $table->date('date_of_leaving')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('educational_background')->nullable();
            $table->string('signature')->nullable();
            $table->string('pds')->nullable();
            $table->string('service_record')->nullable();
            $table->string('registered_face')->nullable();
            $table->string('status', 50)->default('Active');
            $table->string('password');
            $table->string('profile_image')->default('/images/profile_picture.png');
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
