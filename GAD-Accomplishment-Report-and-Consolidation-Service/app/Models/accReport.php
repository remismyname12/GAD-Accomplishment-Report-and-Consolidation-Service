<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class accReport extends Model
{
    use HasFactory;

    //
    public function form_Employee(): BelongsTo
    {
        return $this->belongsTo(formEmployee::class);
    }

    public function form_Inset(): BelongsTo
    {
        return $this->belongsTo(formInset::class);
    }

    public function form_Research(): BelongsTo
    {
        return $this->belongsTo(formResearch::class);
    }
}
