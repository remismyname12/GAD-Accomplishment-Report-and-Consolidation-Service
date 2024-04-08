<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserRequest;
use App\Models\Forms;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    //for show all users
    public function index()
    {
        $data = User::withCount(['forms', 'accomplishmentReport'])
                    ->get(['id', 'name', 'email']); // Assuming you want to select only specific columns from the User table
            
        return response()->json($data);
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
            'role' => $data['role'],
            'password' => bcrypt($data['password'])
        ]);
    
        return response([
            'success' => true,
            'message' => 'User created Successfully',
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

    public function archiveuser($id)
    {
        // Find the user by ID
        $user = User::find($id);
    
        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $user->delete();
    
        return response()->json(['message' => 'User archived successfully']);
    }

    public function restoreuser($id)
    {
        // Find the user by ID
        $user = User::withTrashed()
        ->find($id);
    
        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Eloquent automatically handles soft deletes if the model uses the SoftDeletes trait, if SoftDeletes is used
        $user->restore();
    
        return response()->json(['message' => 'User Restored successfully']);
    }

    public function userarchiveindex()
    {
        $users = User::onlyTrashed()
        ->get();

        return response()->json($users);
    }

    public function deleteuser($id)
    {
        // Find the user by ID
        $user = User::withTrashed()
        ->find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Force delete the user
        $user->forceDelete();

        return response()->json(['message' => 'User permanently deleted']);
    }
}
