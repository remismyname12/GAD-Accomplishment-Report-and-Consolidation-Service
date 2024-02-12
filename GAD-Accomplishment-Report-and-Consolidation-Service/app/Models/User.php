<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    //FOR FORMS/TRAINING DESIGN
        public function form_employee(): HasMany
        {
            return $this->hasMany(formEmployee::class);
        }

        public function form_inset(): HasMany
        {
            return $this->hasMany(formInset::class);
        }
        
        public function form_research(): HasMany
        {
            return $this->hasMany(formResearch::class);
        }


    //FOR GAD ACTIVITES
        public function gad_activities(): HasMany
        {
            return $this->hasMany(gadActivites::class); //used to be has one
        }
    
    //ATTACH TO GAD ACTIVITIES
    /*
        public function expenditure_sum()
        {
            return $this->hasOne(expenditureSum::class);
        }
    */

    //LEARN COLLECTION FOR PER HEAD PER DAY

}
