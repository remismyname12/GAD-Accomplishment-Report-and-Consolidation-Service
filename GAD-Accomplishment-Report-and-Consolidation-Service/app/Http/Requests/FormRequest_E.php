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
        /*return [ form_data
            'title' => 'required|string',
            'purpose' => 'required|string',
            'legal_bases' => 'required|string',
            'date_of_activity' => 'required|string',
            'venue' => 'required|string',
            'participants' => 'required|string',
            'no_of_target_participants' => 'required|string',
            'learning_service_providers' => 'required|string',
            'expected_outputs' => 'required|string',
            'fund_source' => 'required|string',
        ];
        return [ xp_data
            'form_id' => 'required|string',
            'items' => 'required|string',
            'per_head_per_day' => 'required|string',
            'total' => 'required|string',
        ];*/
        return [
            'xp_data' => 'required|array',
            'form_data' => 'required|array',
        ];
    }
}
