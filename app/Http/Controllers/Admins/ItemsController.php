<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Traits\ItemRules;
use App\Traits\UploadPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemsController extends Controller
{

    use UploadPhoto;
    use ItemRules;

    public function addItem(Request $request, $id)
    {

        $rules = $this->itemRules();

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['error at validation'], 400);
        }

        // import from trait(UploadPhoto)
        $fileName = $this->uploadPhoto($request->file('photo'), 'images/items');

        $items = Item::create([
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'status' => $request->get('status'),
            'price' => $request->get('price'),
            'date' => now(),
            'approve' => 1,
            'photoUrl' => $fileName,
            'admin_id' => $id
        ]);

        return response()->json(compact('items'));
    }

    public function getItems()
    {
        $items = Item::orderBy('id', 'desc')->paginate(5);

        return response()->json(compact('items'));
    }

    public function editItem($id)
    {
        $item = Item::find($id);

        return response()->json(compact('item'));
    }

    public function updateItem(Request $request, $id)
    {
        $rules = $this->itemRules();

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['error at validation'], 400);
        }

        $fileName = $this->uploadPhoto($request->file('photo'), 'images/items');

        $item = Item::find($id);

        $item->name = $request->name;
        $item->description = $request->description;
        $item->status = $request->status;
        $item->price = $request->price;
        $item->photoUrl = $fileName;

        $item->save();

        return response()->json(compact('item'));
    }

    public function deleteItem($id)
    {
        $item = Item::find($id);

        if ($item) {
            $item->delete();
            return response()->json([
                'msg' => 'successful'
            ]);
        } else {
            return response()->json([
                'msg' => 'No Item Exists with that ID'
            ]);
        }


    }
}
