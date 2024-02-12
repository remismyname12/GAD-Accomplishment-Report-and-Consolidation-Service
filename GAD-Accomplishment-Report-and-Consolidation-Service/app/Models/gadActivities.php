<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class gadActivities extends Model
{
    use HasFactory;

     //
     public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }
 
     //ATTACH TO GAD ACTIVITIES
     
         public function expenditure_gad(): HasOne
         {
             return $this->hasOne(expenditureGad::class);
         }
}
