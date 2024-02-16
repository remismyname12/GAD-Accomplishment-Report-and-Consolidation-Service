<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccomplishmentReportRequest;
use App\Models\accReport;
use App\Models\Expenditures;
use Illuminate\Http\Request;

class AccomplishmentReportController extends Controller
{
    
    public function index_accomplishment_report() {
        $accomplishmentReport = accReport::with('forms')->get();

        return response($accomplishmentReport);

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

    }

    public function index_all_archived_accomplishment_report() {

    }

    public function accomplishment_report_archive() {

    }

    public function accomplishment_report_restore() {

    }

    public function accomplishment_report_delete() {

    }
}
