<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mandates extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mandates';

    protected $fillable = [
        'gender_issue',
        'cause_of_gender_issue',
        'gad_result_statement',
        'gad_activity',
        'performance_indicators',
        'target_result',
        'focus'
    ];

    public function accReport(): HasMany
    {
        return $this->hasMany(accReport::class);
    }
}
