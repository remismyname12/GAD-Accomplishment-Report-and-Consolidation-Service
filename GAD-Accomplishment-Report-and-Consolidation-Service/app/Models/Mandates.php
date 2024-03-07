<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mandates extends Model
{
    use HasFactory;

    protected $table = 'mandates';

    protected $fillable = [
        'gender_issue',
        'cause_of_gender_issue',
        'gad_result_statement',
        'gad_activity',
        'performance_indicators',
    ];
}
