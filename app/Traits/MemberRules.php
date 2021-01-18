<?php

namespace App\Traits;

trait MemberRules
{
    public function memberRules()
    {
        return [
            'name' => 'required|string|min:4|max:25',
            'email' => 'required|email|max:100',
            'password' => 'required|string|min:8|max:50',
            'photo' => 'image|mimes:jpg,jpeg,gif,png|max:1400048'

        ];
    }
}
