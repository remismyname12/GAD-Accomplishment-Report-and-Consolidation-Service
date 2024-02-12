<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class formResearch extends Model
{
    use HasFactory;

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
 
         public function expenditure_list(): HasOne
         {
             return $this->hasOne(expenditureList::class);
         }
}
