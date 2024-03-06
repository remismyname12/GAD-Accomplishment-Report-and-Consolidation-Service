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
        'approved_budget',
        'actual_expenditure'
    ];
    public function accReport(): BelongsTo
    {
        return $this->belongsTo(accReport::class);
    }
}
