<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        public function form_employee()
        {
            return $this->hasOne(formEmployee::class);
        }

        public function form_inset()
        {
            return $this->hasOne(formInset::class);
        }
        
        public function form_research()
        {
            return $this->hasOne(formResearch::class);
        }

    //FOR ACCOMPLISHMENT REPORTS + EXPENDITURE
    /*  public function acc_report()
        {
            return $this->hasOne(accReport::class);
        }

        public function expenditure_list()
        {
            return $this->hasOne(expenditureList::class);
        }

        MOVE TO FORMS INSTEAD
        
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    */

    //FOR GAD ACTIVITES
        public function gad_activities()
        {
            return $this->hasOne(gadActivites::class);
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
