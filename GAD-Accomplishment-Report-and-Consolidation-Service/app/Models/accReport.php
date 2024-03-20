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
        'mandates_id',
        'title',
        'date_of_activity',
        'venue',
        'no_of_participants',
        'male_participants',
        'female_participants',
        'fund_source',
        'clientele_type',
        'clientele_number',
        'actual_cost',
        'cooperating_agencies_units',
        'focus',
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

    public function mandates(): BelongsTo
    {
        return $this->belongsTo(Mandates::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }
}
