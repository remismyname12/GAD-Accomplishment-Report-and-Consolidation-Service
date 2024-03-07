<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MandatesRequest extends FormRequest
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
            'form_data' => 'required|array',

            'form_data.gender_issue' => 'required|string',
            'form_data.cause_of_gender_issue' => 'required|string',
            'form_data.gad_result_statement' => 'required|string',
            'form_data.gad_activity' => 'required|string',
            'form_data.performance_indicators' => 'required|string',
        ];
    }
}
