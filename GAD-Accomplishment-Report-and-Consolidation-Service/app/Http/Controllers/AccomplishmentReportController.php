<?php

namespace App\Http\Controllers;

use App\Http\Requests\ACReportRequest_E_I;
use App\Models\accReport;
use App\Models\ActualExpendature;
use App\Models\Expenditures;

class AccomplishmentReportController extends Controller
{
    
    public function index_accomplishment_report() {
        $accomplishmentReport = accReport::with('actualExpenditure')->get();

        return response($accomplishmentReport);
    }

    public function index_expenditures($id)
    {
        $forms_id = $id;
        //$form = Expenditures::find($forms_id);
        $xps = Expenditures::where('forms_id', $forms_id)->get();

        return response($forms_id);
    }

    public function accomplishment_report_store(ACReportRequest_E_I $request) {
        $accReport = $request->validated('accReport');
        $expenditures = $request->validated('expenditures');

            accReport::create([
                'forms_id' => $accReport['forms_id'],
                'title' => $accReport['title'],
                'date_of_activity' => $accReport['date_of_activity'],
                'venue' => $accReport['venue'],
                'no_of_participants' => $accReport['no_of_participants'],
                'male_participants' => $accReport['male_participants'],
                'female_participants' => $accReport['female_participants'],
                'focus' => '0',
            ]);

            // Find the first item with the given title
            $firstItem = accReport::where('title', $accReport['title'])->first();

            foreach ($expenditures as $expenditure) {
                ActualExpendature::create([
                    'acc_report_id' => $firstItem->id,
                    'type' => $expenditure['type'],
                    'items' => $expenditure['item'],
                    'approved_budget' => $expenditure['approved_budget'],
                    'actual_expenditure' => $expenditure['actual_expenditure'],
                ]);
            }
            
        //update parent tables or not?

        return response([
            'success' => true,
            'message' => 'Accomplishment Report Successfully Created'
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
