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
            'forms_id' => 'required|integer',
            'expenditures' => 'required|array',

            'expenditures.*.type' => 'required|string',
            'expenditures.*.item' => 'required|string',
            'expenditures.*.remarks' => 'required|string',
            'expenditures.*.source_of_funds' => 'required|string',
            'expenditures.*.actual_cost' => 'required|string',
            'expenditures.*.total' => 'required|string',
        ];
    }
}
