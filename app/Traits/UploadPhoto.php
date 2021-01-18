<?php

namespace App\Traits;

trait UploadPhoto
{

    public function uploadPhoto($reqest, $path)
    {
        $file = $reqest;
        $filename = time() . '_' . $file->getClientOriginalName();
        $filePath = $path;
        $file->move($filePath, $filename);

        return $filename;
    }
}
