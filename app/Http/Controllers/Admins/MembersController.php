<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\MemberRules;
use App\Traits\UploadPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MembersController extends Controller
{
    use UploadPhoto, MemberRules;

    public function addUser(Request $request)
    {

        /// import from trait(MembersRules)
        $rules = $this->memberRules();

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['error at validation'], 400);
        }

        $fileName = '';
        if ($request->file('photo')) {
            //import from trait(UploadPhoto)
            $fileName = $this->uploadPhoto($request->file('photo'), 'images/items');
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'date' => now(),
            'approve' => 1,
            'photo' => $fileName,
        ]);

        return response()->json(compact('user'));
    }
}
