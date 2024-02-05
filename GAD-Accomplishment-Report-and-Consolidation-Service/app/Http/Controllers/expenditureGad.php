<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class expenditureGad extends Controller
{
    //
    public function gad_Activities()
    {
        return $this->belongsTo(gadActivities::class);
    }
}
