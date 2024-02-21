<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormRequest_E extends FormRequest
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
            'xp_data.*.per_item' => 'required|string',
            'xp_data.*.no_item' => 'required|string',
            'xp_data.*.times' => 'required|string',
            'xp_data.*.total' => 'required|numeric',
            //-----
            
            'form_data' => 'required|array',
            //-----
            'form_data.title' => 'required|string',
            'form_data.purpose' => 'required|string',
            'form_data.legal_bases' => 'required|string',
            'form_data.date_of_activity' => 'required|string',
            'form_data.venue' => 'required|string',
            'form_data.participants' => 'required|string',
            'form_data.no_of_target_participants' => 'required|string',
            'form_data.learning_service_providers' => 'required|string',
            'form_data.expected_outputs' => 'required|string',
            'form_data.fund_source' => 'required|string',
            'form_data.proponents_implementors' => 'required|string',
            //-----
        ];
    }
}
