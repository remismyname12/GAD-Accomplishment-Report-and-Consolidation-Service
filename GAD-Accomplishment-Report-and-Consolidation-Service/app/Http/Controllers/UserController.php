<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //for show all users
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function adduser(AddUserRequest $request){
        $data = $request->validated();
    
        // Check if the email already exists
        if (User::where('email', $data['email'])->exists()) {
            return response([
                'success' => false,
                'message' => 'Email already exists.',
            ], 400); // You can choose an appropriate HTTP status code (e.g., 400 Bad Request)
        }
    
        // Create a new user if the email doesn't exist
        /** @var \App\Models\User $user */
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
    
        return response([
            'success' => true,
            'user' => $user,
        ]);
    }
    
    public function updateuser(Request $request, $id){
        // Validate the incoming data (e.g., name, role, email, lastedit)
        $validatedData = $request->validate([
            'username' => 'nullable|string',
            'email' => 'nullable|email'
            //'lastedit' => 'required|date', // Modify this validation rule as needed
        ]);

        // Retrieve the user based on the provided ID
        $user = User::find($id);

        if (!$user) {
            // Handle the case where the user with the provided ID is not found
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's information with the validated data
        $user->update($validatedData);

        // Return a success response
        return response()->json(['message' => 'User updated successfully']);
    }
}
