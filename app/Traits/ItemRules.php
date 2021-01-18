<?php

namespace App\Traits;

trait ItemRules
{

    public function itemRules()
    {
        return [
            'name' => 'required|string|min:4|max:25',
            'description' => 'required|string|min:4|max:100',
            'status' => 'required|numeric',
            'price' => 'required|string',
            'photo' => 'required|image|mimes:jpg,jpeg,gif,png|max:14000048'
        ];
    }
}
