<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gadActivities extends Model
{
    use HasFactory;

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
