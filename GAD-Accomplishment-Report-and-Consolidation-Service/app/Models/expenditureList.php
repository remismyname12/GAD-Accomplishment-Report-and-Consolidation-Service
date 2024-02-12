<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class expenditureList extends Model
{
    use HasFactory;

    protected $table = 'xpenditure_e';

    protected $fillable = [
        'form_id',
        'type',
        'items',
        'per_head_per_day',
        'total',
    ];

    public function employee_form(): BelongsTo
    {
        return $this->belongsTo(formEmployee::class, 'form_id'); 
        //foreign key specified because it doesn't follow laravel convention
    }

}
