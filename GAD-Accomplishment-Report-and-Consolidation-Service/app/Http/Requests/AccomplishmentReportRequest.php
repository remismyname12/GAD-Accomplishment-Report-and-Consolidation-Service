<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccomplishmentReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'accReport' => 'required|array',
            'accReport.forms_id' => 'required|integer',
            'accReport.title' => 'required|string',
            'accReport.date_of_activity' => 'required|string',
            'accReport.venue' => 'required|string',
            'accReport.no_of_participants' => 'string',
            'accReport.male_participants' => 'string',
            'accReport.female_participants' => 'string',
            'accReport.fund_source' => 'string',
            'accReport.clientele_type' => 'string',
            'accReport.clientele_number' => 'string',
            'accReport.actual_cost' => 'string',
            'accReport.cooperating_agencies_units' => 'string',
            
            'expenditures' => 'required|array',
            'expenditures.*.type' => 'required|string',
            'expenditures.*.item' => 'required|string',
            'expenditures.*.remarks' => 'required|string',
            'expenditures.*.source_of_funds' => 'required|string',
            // 'expenditures.*.actual_cost' => 'required|string',
        ];
}
}
