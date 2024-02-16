<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccomplishmentReportRequest;
use App\Models\accReport;
use App\Models\Expenditures;
use App\Models\Forms;

class AccomplishmentReportController extends Controller
{
    
    public function index_accomplishment_report() {
        $accomplishmentReport = accReport::with('forms')->get();

        $formsParent = Forms::with('expenditures')->get();

        $groupedReports = $accomplishmentReport->groupBy('forms_id');

        // Initialize an empty array to store the unique instances
        $uniqueInstances = [];

        // Iterate through the grouped reports
        foreach ($groupedReports as $formsId => $reports) {
            // Take only the first instance for each 'forms_id'
        $uniqueInstance = $reports->first();
        
        // Append expenditures if forms_id matches
        $uniqueInstance['expenditures'] = $formsParent
            ->where('id', $formsId) // Filter formsParent to match forms_id
            ->first() // Retrieve the first matching record
            ->expenditures; // Access expenditures relationship
        
        // Add the unique instance to the array
        $uniqueInstances[] = $uniqueInstance;
        }

        return response($uniqueInstances);
        //return response($formsParent);
    }

    public function index_expenditures($id)
    {
        $forms_id = $id;
        //$form = Expenditures::find($forms_id);
        $xps = Expenditures::where('forms_id', $forms_id)->get();

        return response($forms_id);
    }

    public function accomplishment_report_store(AccomplishmentReportRequest $request) {
        $forms_id = $request->input('forms_id');
        $expenditures = $request->input('expenditures');

        foreach ($expenditures as $expenditure) {
            accReport::create([
                'forms_id' => $forms_id,
                'expenditures_id' => $expenditure['id']
            ]);
        }
        

        return response([
            'success' => true,
            'data' => $expenditures
    ]);
    }

    public function accomplishment_report_update() {
        //Update on the parent (Forms)
    }

    public function index_all_archived_accomplishment_report() {
        
        $allForms = accReport::with('forms')->onlyTrashed()->get();

        return response()->json($allForms);
    }

    public function accomplishment_report_archive($id) {
        // Find the form by ID
        $form = accReport::find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->delete();
    
        return response()->json(['message' => 'Form archived successfully']);
    }

    public function accomplishment_report_restore($id)
    {
        // Find the form by ID
        $form = accReport::withTrashed()
        ->find($id);
    
        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Report not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $form->restore();
    
        return response()->json(['message' => 'Report Restored successfully']);
    }

    public function accomplishment_report_delete($id) {
        // Find the form by ID
        $form = accReport::withTrashed()
        ->find($id);

        // Check if the form exists
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        // Force delete the form
        $form->forceDelete();

        return response()->json(['message' => 'Form permanently deleted']);
    }
}
