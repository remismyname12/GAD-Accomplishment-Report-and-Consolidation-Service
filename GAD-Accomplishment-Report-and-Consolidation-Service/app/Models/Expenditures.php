<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Expenditures extends Model
{
    use HasFactory;

    protected $table = 'expenditures';

    protected $fillable = [
        'forms_id',
        'type',
        'items',
        'per_head_per_day',
        'estimated_cost',
        'remarks',
        'source_of_funds',
        'total',
    ];

    public function forms(): BelongsTo
    {
        return $this->belongsTo(Forms::class);
        //return $this->belongsTo(formAll::class, 'form_id'); 
        //foreign key specified because it doesn't follow laravel convention
    }

    public function accReport(): HasOne
    {
        return $this->HasOne(accReport::class);
    }
}
