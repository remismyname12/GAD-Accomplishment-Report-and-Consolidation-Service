<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequest_E;
use App\Http\Requests\FormRequest_I;
use App\Http\Requests\FormRequest_R;
use App\Models\User;
use App\Models\Forms;
use App\Models\Expenditures;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    //for show all users
    public function index_employee_forms()
    {
        $forms = Forms::where('form_type', 'EMPLOYEE')->get();
        //$forms = Forms::all();

        return response()->json($forms);
    }

    //for show all users
    public function indexInsetForms()
    {
        $forms = Forms::where('form_type', 'INSET')->get();
        //$forms = Forms::all();

        return response()->json($forms);
    }


    public function index_all_archived_forms()
    {

        $allForms = Forms::onlyTrashed()->get();

        return response()->json($allForms);
    }

    //for EMPLOYEE training design==============================================================================================
    public function form_employee_store(FormRequest_E $request)
    {
        $formData = $request->input('form_data');
        $inputFields = $request->input('xp_data');
        $formtitle = $formData['title'];
        $formtype = "EMPLOYEE";
        $user = Auth::user();

        //if $form exists in table return, training design with the name X already exists
        //create pop-up in frontend to tell user

        $existingRecord = Forms::where('title', $formtitle )->exists();

        if ($existingRecord) {
            return response([
                'Success' => false,
                'Message' => 'Title must be unique',
            ]);
            //return response()->json(['error' => 'Title must be unique'], 422);
        }

        $form = Forms::create([
            'title' => $formtitle,
            'user_id' => $user->id,
            'form_type' => $formtype,
            'purpose' => $formData['purpose'],
            'legal_bases' => $formData['legal_bases'],
            'date_of_activity' => $formData['date_of_activity'],
            'venue' => $formData['venue'],
            'participants' => $formData['participants'],
            'no_of_target_participants' => $formData['no_of_target_participants'],
            'learning_service_providers' => $formData['learning_service_providers'],
            'expected_outputs' => $formData['expected_outputs'],
            'fund_source' => $formData['fund_source'],
            'proponents_implementors' => $formData['proponents_implementors'],
        ]);

        // Find the first item with the given title
        $firstItem = Forms::where('title', $formData['title'])->first();
 
        foreach ($inputFields as $data) {
            Expenditures::create([
                'form_id' => $firstItem->id,
                'type' => $data['type'],
                'items' => $data['item'],
                'per_head_per_day' => $data['phpd'], // Assuming 'phpd' corresponds to 'perhead'
                'total' => $data['total'],
            ]);
        }

        return response([
              'Success' => true,
              'Message' => 'Form Added'
        ]);

    }

    public function form_employee_update(FormRequest_E $request, $id)
    {
        $validatedData = $request->validated();
        $form = Forms::find($id);
        $formArray = $validatedData['form_data'];

        $form->update($formArray);

            return response([
             'Success' => true,
             'Message' => $formArray,
             //'Message' => 'Form Updated'
       ]);
    }
    
    public function form_inset_store(FormRequest_I $request)
    {
        
        $formData = $request->input('form_data');
        $inputFields = $request->input('xp_data');
        $formtitle = $formData['title'];
        $formtype = "INSET";
        $user = Auth::user();
        
        $existingRecord = Forms::where('title', $formtitle )->exists();

        if ($existingRecord) {
            return response([
                'Success' => false,
                'Message' => 'Title must be unique',
            ]);
            //return response()->json(['error' => 'Title must be unique'], 422);
        }

        $form = Forms::create([
            'title' => $formtitle,
            'user_id' => $user->id,
            'form_type' => $formtype,
            'purpose' => $formData['purpose'],
            'legal_bases' => $formData['legal_bases'],
            'date_of_activity' => $formData['date_of_activity'],
            'venue' => $formData['venue'],
            'participants' => $formData['participants'],
            'learning_service_providers' => $formData['learning_service_providers'],
            'expected_outputs' => $formData['expected_outputs'],
            'fund_source' => $formData['fund_source'],
            'proponents_implementors' => $formData['proponents_implementors'],
        ]);

        // Find the first item with the given title
        $firstItem = Forms::where('title', $formData['title'])->first();

        foreach ($inputFields as $data) {
            Expenditures::create([
                'form_id' => $firstItem->id,
                'type' => $data['type'],
                'items' => $data['item'],
                'per_head_per_day' => $data['phpd'], // Assuming 'phpd' corresponds to 'perhead'
                'total' => $data['total'],
            ]);
        }

        return response([
                'Success' => true,
                'Message' => 'Form Added'
        ]);
    }

    public function form_inset_update(FormRequest_I $request, $id)
    {
       $validatedData = $request->validated();
       $form = Forms::find($id);
       $formArray = $validatedData['form_data'];

       $form->update($formArray);

            return response([
             'Success' => true,
             'Message' => 'Form Updated'
       ]);
    }

    public function form_archive($id){
        // Find the form by ID
        $form = Forms::find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->delete();
    
        return response()->json(['message' => 'Form archived successfully']);
    }

    public function form_restore($id)
    {
        // Find the form by ID
        $form = Forms::withTrashed()
        ->find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->restore();
    
        return response()->json(['message' => 'Form Restored successfully']);
    }

    public function form_delete($id)
    {
        // Find the form by ID
        $form = Forms::withTrashed()
        ->find($id);

        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        // Force delete the form
        $form->forceDelete();

        return response()->json(['message' => 'Form permanently deleted']);
    }

    //for EAD training design==============================================================================================
    public function form_ead_store(FormRequest_R $request)
    {

        $formData = $request->input('form_data');
        $inputFields = $request->input('xp_data');
        $formtitle = $formData['title'];
        $formtype = "EAD";
        $user = Auth::user();
 
        $existingRecord = Forms::where('title', $formtitle )->exists();
 
        if ($existingRecord) {
            return response([
                'Success' => false,
                'Message' => 'Title must be unique',
            ]);
            //return response()->json(['error' => 'Title must be unique'], 422);
        }
 
        $form = Forms::create([
            'title' => $formtitle,
            'user_id' => $user->id,
            'form_type' => $formtype,
            'date_of_activity' => $formData['date_of_activity'],
            'venue' => $formData['venue'],
            'clientele_type' => $formData['clientele_type'],
            'clientele_number' => $formData['clientele_number'],
            'estimated_cost' => $formData['estimated_cost'],
            'cooperating_agencies_units' => $formData['cooperating_agencies_units'],
            'expected_outputs' => $formData['expected_outputs'],
            'fund_source' => $formData['fund_source'],
            'proponents_implementors' => $formData['proponents_implementors'],
        ]);
 
        // Find the first item with the given title
        $firstItem = Forms::where('title', $formData['title'])->first();
  
        foreach ($inputFields as $data) {
            Expenditures::create([
                'form_id' => $firstItem->id,
                'type' => $data['type'],
                'items' => $data['item'],
                'estimated_cost' => $data['estimated'], // Assuming 'phpd' corresponds to 'perhead'
                'remarks' => $data['remarks'],
                'source_of_funds' => $data['source_of_funds'],
            ]);
        }
 
        return response([
               'Success' => true,
               'Message' => 'Form Added'
        ]);
 
    }

    public function form_R_store(FormRequest_R $request)
    {

        $formData = $request->input('form_data');
        $inputFields = $request->input('xp_data');

        return response([
            'Succes' => True,
        ]);
    }

}