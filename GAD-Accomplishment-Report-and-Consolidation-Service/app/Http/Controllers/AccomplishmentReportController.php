<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccomplishmentReportRequest;
use App\Models\accReport;
use App\Models\Expenditures;
use Illuminate\Http\Request;

class AccomplishmentReportController extends Controller
{
    public function accomplishment_report_store(AccomplishmentReportRequest $request) {
        $validatedData = $request->validated();
        
        accReport::create([
            'forms_id' => $validatedData['forms_id'],
            'expenditures_id' => $validatedData['expenditures_id']
        ]);

        return response([
            'success' => true,
            'data' => $validatedData
    ]);
    }

    public function index_accomplishment_report() {

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
