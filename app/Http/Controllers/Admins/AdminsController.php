<?php



namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class AdminsController extends Controller
{
    public function adminsLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json('Invalid credentials');
            }
        } catch (JWTException $exception) {
            return response()->json('Cant Create Token');
        }

        return response()->json(compact('token'));
    }

    public function getAuthenticatedAdmin()
    {

        try {

            if (!$admin = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('admin'));
    }
}
