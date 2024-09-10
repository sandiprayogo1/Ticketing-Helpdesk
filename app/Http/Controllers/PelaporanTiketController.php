<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Resources\MasterCaseCategoryResource;
use App\Http\Resources\MasterSkalaLevelResource;
use App\Http\Resources\NewTicketResource;
use App\Models\CaseCategory;
use App\Models\SkalaLevel;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\NewTicket;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PelaporanTiketController extends Controller
{
    public function pelaporan()
    {
        $level = MasterSkalaLevelResource::collection(SkalaLevel::all());
        $case_category = MasterCaseCategoryResource::collection(CaseCategory::all());

        // $teknisis = User::where('role_id', 3)->get();
        // $selectedTeknisi = $teknisis[0]->id;
        // dd(Ticket::where('status_id', 2)->get());

        return Inertia::render('Pelaporan/Pelaporan', compact('level', 'case_category'));
    }

    private function getLeastData($data)
    {
        // Mengelompokkan data berdasarkan teknisi
        $teknisi_tiket = array_reduce($data, function ($result, $item) {
            $result[$item['teknisi']][] = $item;
            return $result;
        }, []);

        // Mencari teknisi dengan tiket paling sedikit
        $min_tiket = PHP_INT_MAX;
        $teknisi_paling_sedikit = [];

        foreach ($teknisi_tiket as $teknisi => $tiket) {
            if (count($tiket) === $min_tiket) {
                $teknisi_paling_sedikit[$teknisi] = $tiket;
            } elseif (count($tiket) < $min_tiket) {
                $min_tiket = count($tiket);
                $teknisi_paling_sedikit = [$teknisi => $tiket];
            }
        }

        // Menggabungkan semua data dari teknisi dengan tiket paling sedikit
        $data_terfilter = [];
        foreach ($teknisi_paling_sedikit as $tiket) {
            $data_terfilter = array_merge($data_terfilter, $tiket);
        }
        return $data_terfilter;
    }

    private function sortData($data, $levels) {
        usort($data, function ($a, $b) use ($levels) {
            // Dapatkan indeks level dari masing-masing data
            $level_a = array_search($a['level'], $levels);
            $level_b = array_search($b['level'], $levels);

            if ($level_a !== $level_b) {
                return $level_a <=> $level_b; // Urutkan ascending berdasarkan level
            }

            // Bandingkan indeks level. Indeks yang lebih kecil berarti level lebih tinggi
            return $a['created_at'] <=> $b['created_at'];
        });
        return $data;
    }

    public function store_pelaporan(StoreTicketRequest $request)
    {
        $requester = Auth::id();
        $user = Auth::user();
        $level = $user->jabatan->skala_level_id;

        $levels = SkalaLevel::orderBy('point')->pluck('id')->toArray();
        $teknisisIds = User::where('role_id', 3)->pluck('id')->toArray();
        $ticketIds = Ticket::whereIn('status_id', [1, 2])->pluck('teknisi')->toArray();
        $availTeknisis = [];

        foreach ($teknisisIds as $id) {
            if (array_search($id, $ticketIds) === false) {
                $availTeknisis[] = $id;
            }
        }

        if (!$availTeknisis) {
            $newTickets = Ticket::whereIn('status_id', [1, 2])->get()->toArray();

            $data_terfilter = $this->getLeastData($newTickets);
            $data_tersort = $this->sortData($data_terfilter, $levels);
            foreach ($data_tersort as $ticket) {
                $availTeknisis[] = $ticket['teknisi'];
            }
        }

        $selectedTeknisi = $availTeknisis[0];

        $ticket = Ticket::create([
            "nomor_ticket"       => Ticket::nomorTicket(),
            "requester"          => $requester,
            "case_category_id"   => $request->case_category_id,
            "level"              => $level,
            "tempat"             => $request->tempat,
            "deskripsi"          => $request->deskripsi,
            "status_id"          => 1,
            "teknisi"            => $selectedTeknisi
        ]);

        if ($ticket) {
            $teknisi = User::findOrFail($selectedTeknisi);
            $teknisi->notify(new NewTicket($ticket));
        }

        return redirect()->route('pelaporan')->with('success', 'Laporan anda berhasil dibuat');
    }

    public function monitor_tiket()
    {
        $userId = Auth::id();
        $query = Ticket::where('requester', $userId)
                        ->get();
        $tickets = NewTicketResource::collection($query);
        return Inertia::render('Pelaporan/MonitoringTiket', compact('tickets'));
    }
}
