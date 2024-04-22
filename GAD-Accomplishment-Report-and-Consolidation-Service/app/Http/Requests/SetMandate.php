<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetMandate extends FormRequest
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
            'reportList' => 'required|array',
            'mandate_id' => 'required|string',
        ];
    }
}
