<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActualExpendature extends Model
{
    use HasFactory;

    protected $fillable = [
        'acc_report_id',
        'type',
        'items',
        'remarks',
        'source_of_funds',
        'actual_cost',
        'total',
    ];
    public function accReport(): BelongsTo
    {
        return $this->belongsTo(accReport::class);
    }
}
