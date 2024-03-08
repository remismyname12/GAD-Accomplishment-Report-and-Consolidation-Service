<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddMandate extends FormRequest
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
            'set_mandate' => 'required|array',
            'set_mandate.*.mandate_id' => 'required|string',
            'set_mandate.*.activities' => 'required|array',
            'set_mandate.*.activities.*.activity_id' => 'required|string',
        ];
    }
}
