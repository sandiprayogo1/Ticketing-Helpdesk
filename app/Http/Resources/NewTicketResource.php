<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewTicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"            => $this->id,
            "nomor_ticket"  => $this->nomor_ticket,
            "requester"     => $this->requesterName->name,
            "category"      => $this->category->category,
            "level"         => $this->levelName->level,
            "tempat"        => $this->tempat,
            "deskripsi"     => $this->deskripsi,
            "status"        => $this->status->status,
            "teknisi"       => $this->teknisiName->name ?? '',
            "request_date"  => Carbon::parse($this->created_at)->format('d F Y : H:i:s'),
            "foto"          => $this->foto,
            "deskripsi_pm"  => $this->deskripsi_pm,
            "bagian"        => $this->requesterName->bagian,
            "teknisi_id"    => $this->teknisiName->id ?? 1,
        ];
    }
}
