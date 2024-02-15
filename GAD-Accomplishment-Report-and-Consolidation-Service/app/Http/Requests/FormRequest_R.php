<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormRequest_R extends FormRequest
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
            'xp_data' => 'required|array',
            //-----
            'xp_data.*.type' => 'required|string',
            'xp_data.*.item' => 'required|string',
            'xp_data.*.estimated' => 'required|string',
            'xp_data.*.remarks' => 'required|string',
            'xp_data.*.source_of_funds' => 'required|string',
            //-----
            //differen for EAD
            'form_data' => 'required|array',
            //-----
            'form_data.title' => 'required|string',
            'form_data.date_of_activity' => 'required|string',
            'form_data.venue' => 'required|string',
            'form_data.clientele_type' => 'required|string',
            'form_data.clientele_number' => 'required|string',
            'form_data.estimated_cost' => 'required|string',
            'form_data.cooperating_agencies_units' => 'required|string',
            'form_data.expected_outputs' => 'required|string',
            'form_data.fund_source' => 'required|string',
            'form_data.proponents_implementors' => 'required|string',
            //-----
        ];
    }
}
