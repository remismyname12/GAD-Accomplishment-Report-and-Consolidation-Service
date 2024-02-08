<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequest_E;
use App\Http\Requests\FormRequest_I;
use App\Http\Requests\XpenditureRequest;
use App\Models\formEmployee;
use App\Models\formInset;
use App\Models\expenditureList;
use App\Models\expenditureList_i;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    //for show all users
    public function index_employee_forms()
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

    public function index_all_archived_forms()
    {
        $employeeForms = formEmployee::onlyTrashed()->get();
        $insetForms = formInset::onlyTrashed()->get();

        // Merge the collections of forms
        $allForms = $employeeForms->merge($insetForms);

        return response()->json($allForms);
    }

    //for EMPLOYEE training design==============================================================================================
    public function form_employee_store(FormRequest_E $request)
    {
       $formData = $request->validated();
       $user= Auth::user();

       $form = formEmployee::create([
        'title' => $formData['title'],
        'user_id' => $user->id,
        'purpose' => $formData['purpose'],
        'legal_bases' => $formData['legal_bases'],
        'date_of_activity' => $formData['date_of_activity'],
        'venue' => $formData['venue'],
        'participants' => $formData['participants'],
        'no_of_target_participants' => $formData['no_of_target_participants'],
        'learning_service_providers' => $formData['learning_service_providers'],
        'expected_outputs' => $formData['expected_outputs'],
        'fund_source' => $formData['fund_source'],
        ]);

       return response()->json(['message' => 'success', $form]);
    }

    public function form_employee_update(FormRequest_E $request, $id)
    {
       $validatedData = $request->validated();
       $form = formEmployee::find($id);
       
       $form->update($validatedData);

            return response([
             'Success' => true,
             'Message' => 'Form Updated'
       ]);
    }

    public function form_employee_archive($id){
        // Find the form by ID
        $form = formEmployee::find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->delete();
    
        return response()->json(['message' => 'Form archived successfully']);
    }

    public function form_employee_restore($id)
    {
        // Find the form by ID
        $form = formEmployee::withTrashed()
        ->find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->restore();
    
        return response()->json(['message' => 'Form Restored successfully']);
    }

    public function form_employee_delete($id)
    {
        // Find the form by ID
        $form = formEmployee::withTrashed()
        ->find($id);

        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        // Force delete the form
        $form->forceDelete();

        return response()->json(['message' => 'Form permanently deleted']);
    }


    public function xpenditure_e_store(XpenditureRequest $request){

        $formData = $request->all();
        $user = Auth::user();
        // Access the form data as an array (equivalent to an object in JavaScript) 
        $xp_data = $formData['xp_data'];

        // Iterate through xp_data and save each entry to the database
        foreach ($xp_data as $data) {
            expenditureList::create([
                'form_id' => $user->id,
                'items' => $data['item'],
                'per_head_per_day' => $data['phpd'], // Assuming 'phpd' corresponds to 'perhead'
                'total' => $data['total'],
            ]);
        }
       

        return response()->json(['message' => 'success', $formData]);
    
    }
    
    public function form_inset_store(FormRequest_I $request)
    {
        $formData = $request->input('form_data');
        $inputFields = $request->input('xp_data');
        $user = Auth::user();
        
        $form = formInset::create([
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

        foreach ($inputFields as $data) {
            expenditureList::create([
                'form_id' => $user->id,
                'items' => $data['item'],
                'per_head_per_day' => $data['phpd'], // Assuming 'phpd' corresponds to 'perhead'
                'total' => $data['total'],
            ]);
        }


        /*$formData = $request->validated();
       $user = Auth::user();
       
       $form = formInset::create([
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
       ]);*/
    }

    public function form_inset_update(FormRequest_I $request, $id)
    {
       $validatedData = $request->validated();
       $form = formInset::find($id);
       
       $form->update($validatedData);

            return response([
             'Success' => true,
             'Message' => 'Form Updated'
       ]);
    }

    public function form_inset_archive($id){
        // Find the form by ID
        $form = formInset::find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->delete();
    
        return response()->json(['message' => 'Form archived successfully']);
    }

    public function form_inset_restore($id)
    {
        // Find the form by ID
        $form = formInset::withTrashed()
        ->find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->restore();
    
        return response()->json(['message' => 'Form Restored successfully']);
    }

    public function form_inset_delete($id)
    {
        // Find the form by ID
        $form = formInset::withTrashed()
        ->find($id);

        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        // Force delete the form
        $form->forceDelete();

        return response()->json(['message' => 'Form permanently deleted']);
    }

    public function xpenditure_i_store(XpenditureRequest $request){

        $formData = $request->all();
        $user = Auth::user();
        // Access the form data as an array (equivalent to an object in JavaScript) 
        $xp_data = $formData['xp_data'];

        // Iterate through xp_data and save each entry to the database
        foreach ($xp_data as $data) {
            expenditureList_i::create([
                'form_id' => $user->id,
                'items' => $data['item'],
                'per_head_per_day' => $data['phpd'], // Assuming 'phpd' corresponds to 'perhead'
                'total' => $data['total'],
            ]);
        }
       

        return response()->json(['message' => 'success', $formData]);
    
    }

}
