<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Forms extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'forms';

    protected $fillable = [
        'title',
        'user_id',
        'purpose',
        'legal_bases',
        'date_of_activity',
        'venue',
        'participants',
        'no_of_target_participants',
        'learning_service_providers',
        'expected_outputs',
        'fund_source',
        'clientele_type',
        'clientele_number',
        'estimated_cost',
        'cooperating_agencies_units',
        'proponents_implementors',
    ];

    // BELONGS TO USER
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //FOR ACCOMPLISHMENT REPORTS + EXPENDITURE
        public function acc_report(): HasOne
        {
            return $this->hasOne(accReport::class);
        }

        public function expenditures(): HasMany
        {
            return $this->hasMany(Expenditures::class);
        }

}
