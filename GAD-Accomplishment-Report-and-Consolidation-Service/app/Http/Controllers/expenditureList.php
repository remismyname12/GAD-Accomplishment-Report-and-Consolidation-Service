<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class expenditureList extends Controller
{
    //
    public function form_Employee()
    {
        return $this->belongsTo(formEmployee::class);
    }

    public function form_Inset()
    {
        return $this->belongsTo(formInset::class);
    }

    public function form_Research()
    {
        return $this->belongsTo(formResearch::class);
    }
}
