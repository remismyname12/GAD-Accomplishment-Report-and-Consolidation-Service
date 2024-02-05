<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class gadActivities extends Controller
{
    //
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //ATTACH TO GAD ACTIVITIES
    
        public function expenditure_gad()
        {
            return $this->hasOne(expenditureGad::class);
        }
        
}
