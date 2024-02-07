<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequest_E;
use App\Http\Requests\FormRequest_I;
use App\Models\formEmployee;
use App\Models\formInset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    //for show all users
    public function indexEmployeeForms()
    {
        $forms = formEmployee::all();

        return response()->json($forms);
    }

    //for show all users
    public function indexInsetForms()
    {
        $forms = formInset::all();

        return response()->json($forms);
    }

    //for employee training design
    public function form_employee_store(FormRequest_E $request)
    {
       $formData = $request->validated();
       $user = Auth::user();

       $formEmployee = new formEmployee();
       $formEmployee->user_id = $user->id;
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

       $formEmployee->save();

       return response()->json(['message' => 'success', $user]);
    }

    public function form_inset_store(FormRequest_I $request)
    {
       $formData = $request->validated();
       $user = Auth::user();
       
       $user = formInset::create([
        'title' => $formData['title'],
        'user_id' => $user->id,
        'purpose' => $formData['purpose'],
        'legal_bases' => $formData['legal_bases'],
        'date_of_LEAD_activity' => $formData['date_of_LEAD_activity'],
        'venue' => $formData['venue'],
        'participants' => $formData['participants'],
        'learning_service_providers' => $formData['learning_service_providers'],
        'expected_outputs' => $formData['expected_outputs'],
        'fund_source' => $formData['fund_source'],
        ]);

       return response([
        'Success' => true,
        'Message' => 'Form Added'
    ]);
    }
}
