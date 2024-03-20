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
            'forms_id' => 'required|integer',
            'title' => 'required|string',
            'date_of_activity' => 'required|string',
            'venue' => 'required|string',
            'proponents_implementors' => 'required|string',
            'male_participants' => 'nullable|numeric',
            'female_participants' => 'nullable|numeric',
            'no_of_participants' => 'required|numeric',
            
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',

            'expenditures' => 'required|array',
            'expenditures.*.type' => 'required|string',
            'expenditures.*.item' => 'required|string',
            'expenditures.*.approved_budget' => 'required|string',
            'expenditures.*.actual_expenditure' => 'required|string',
        ];
    }
    
}
