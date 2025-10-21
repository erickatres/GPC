<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('employees', function (Blueprint $table) {
        $table->longText('profile_image_base64')->nullable();
        $table->longText('signature_base64')->nullable();
        $table->longText('registered_face_base64')->nullable();
    });
}

public function down()
{
    Schema::table('employees', function (Blueprint $table) {
        $table->dropColumn(['profile_image_base64', 'signature_base64', 'registered_face_base64']);
    });
}

};
