<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class accReport extends Model
{
    use HasFactory;

    protected $table = 'acc_report';

    protected $fillable = [
        'forms_id',
        'expenditures_id',
    ];

    //
    public function employeeForm(): BelongsTo
    {
        return $this->belongsTo(Forms::class, 'forms_id');
        //return $this->belongsTo(Forms::class);
    }

    public function expenditures(): BelongsTo
    {
        return $this->belongsTo(Expenditures::class);
    }

}
