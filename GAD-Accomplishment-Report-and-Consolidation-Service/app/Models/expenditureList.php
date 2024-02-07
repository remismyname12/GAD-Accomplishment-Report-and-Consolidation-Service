<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class expenditureList extends Model
{
    use HasFactory;

    protected $table = 'xpenditure_e';

    protected $fillable = [
        'items',
        'per_head_per_day',
        'total',
    ];

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
