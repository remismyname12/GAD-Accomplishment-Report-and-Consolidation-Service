<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class formEmployee extends Controller
{
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
