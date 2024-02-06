<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class expenditureGad extends Model
{
    use HasFactory;

    //
    public function gad_Activities()
    {
        return $this->belongsTo(gadActivities::class);
    }
}
