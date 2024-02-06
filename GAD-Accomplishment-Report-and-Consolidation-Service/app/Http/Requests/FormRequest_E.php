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
            'title' => 'required|string',
            'purpose' => 'required|string',
            'legalbases' => 'required|string',
            'dateofactivity' => 'required|string',
            'venue' => 'required|string',
            'participants' => 'required|string',
            'nooftargetparticipants' => 'required|string',
            'learningserviceproviders' => 'required|string',
            'expectedoutputs' => 'required|string',
            'fundsource' => 'required|string',
        ];
    }
}
