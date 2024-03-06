<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ACReportRequest_E_I extends FormRequest
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
            'accReport.proponents_implementors' => 'required|string',
            'accReport.male_participants' => 'string',
            'accReport.female_participants' => 'string',
            'accReport.no_of_participants' => 'string',
            
            'expenditures' => 'required|array',
            'expenditures.*.type' => 'required|string',
            'expenditures.*.item' => 'required|string',
            'expenditures.*.approved_budget' => 'required|string',
            'expenditures.*.actual_expenditure' => 'required|string',
        ];
    }
}
