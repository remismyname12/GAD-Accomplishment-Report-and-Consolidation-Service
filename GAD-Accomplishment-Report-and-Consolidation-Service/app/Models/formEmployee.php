<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formEmployee extends Model
{
    use HasFactory;

    protected $table = 'form_employee';

    protected $fillable = [
        'title',
        'purpose',
        'legalbases',
        'dateofactivity',
        'venue',
        'participants',
        'nooftargetparticipants',
        'learningserviceproviders',
        'expectedoutputs',
        'fundsource',
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
