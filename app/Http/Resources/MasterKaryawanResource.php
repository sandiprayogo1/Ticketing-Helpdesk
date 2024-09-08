<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MasterKaryawanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"        => $this->id,
            "name"          => $this->name,
            "email"         => $this->email,
            "jabatan_id"         => $this->jabatan->jabatan ?? '',
            "bagian"         => $this->bagian,
        ];
    }
}
