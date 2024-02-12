<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class expenditureGad extends Model
{
    use HasFactory;

    //
    public function gad_Activities(): BelongsTo
    {
        return $this->belongsTo(gadActivities::class);
    }
}
