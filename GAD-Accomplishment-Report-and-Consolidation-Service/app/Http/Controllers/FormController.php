<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequest_E;
use App\Models\formEmployee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    //for employee training design
    public function form_employee_store(FormRequest_E $request)
    {
       $formData = $request->validated();
       $user = Auth::user();

       $formEmployee = new formEmployee();
       //$formEmployee->user_id = $user;
       $formEmployee->title = $formData['title'];
       $formEmployee->purpose = $formData['purpose'];
       $formEmployee->legal_bases = $formData['legalbases'];
       $formEmployee->date_of_activity = $formData['dateofactivity'];
       $formEmployee->venue = $formData['venue'];
       $formEmployee->participants = $formData['participants'];
       $formEmployee->no_of_target_participants = $formData['nooftargetparticipants'];
       $formEmployee->learning_service_providers = $formData['learningserviceproviders'];
       $formEmployee->expected_outputs = $formData['expectedoutputs'];
       $formEmployee->fund_source = $formData['fundsource'];

       return response()->json(['message' => 'success']);
    }
}
