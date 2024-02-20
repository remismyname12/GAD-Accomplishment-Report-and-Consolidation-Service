<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class accReport extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'acc_report';

    protected $fillable = [
        'forms_id',
        'expenditures_id',
    ];

    //
    public function forms(): BelongsTo
    {
        return $this->belongsTo(Forms::class);
    }

    public function expenditures(): BelongsTo
    {
        return $this->belongsTo(Expenditures::class);
    }

    public function actualExpenditure(): HasMany
    {
        return $this->hasMany(ActualExpendature::class);
    }
}
