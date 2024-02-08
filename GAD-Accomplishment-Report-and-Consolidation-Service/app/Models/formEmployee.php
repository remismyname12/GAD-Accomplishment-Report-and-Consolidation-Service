<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class formEmployee extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'form_employee';

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
    ];

    // BELONGS TO USER
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //FOR ACCOMPLISHMENT REPORTS + EXPENDITURE
        public function acc_report()
        {
            return $this->hasOne(accReport::class);
        }

        public function expenditure_list()
        {
            return $this->hasOne(expenditureList::class);
        }
}
