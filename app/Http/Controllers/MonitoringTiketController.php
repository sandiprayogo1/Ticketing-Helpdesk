<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewTicketResource;
use App\Models\User;
use App\Models\Status;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MonitoringTiketController extends Controller
{
    public function edit(string $id)
    {
        $ticket = Ticket::findOrFail($id);
        $users = User::where('role_id', 3)->get();
        $statuses = Status::whereIn('id', [1,2,4,6])->get();
        if ($ticket->status_id == 1) {
            $statuses = Status::whereIn('id', [1,2])->get();
        }elseif ($ticket->status_id == 2){
            $statuses = Status::whereIn('id', [2,3,4])->get();
        }

        return Inertia::render('MonitoringTiket/EditMonitoringTiket', compact('ticket', 'users','statuses'));
    }

    public function detail(string $id)
    {
        $ticket = new NewTicketResource(Ticket::findOrFail($id));
        $users = User::where('role_id', 3)->get();
        $statuses = Status::whereIn('id', [1,2,4,6])->get();
        if ($ticket->status_id == 1) {
            $statuses = Status::whereIn('id', [1,2])->get();
        }elseif ($ticket->status_id == 2){
            $statuses = Status::whereIn('id', [2,3,4])->get();
        }

        return Inertia::render('MonitoringTiket/DetailMonitoringTiket', compact('ticket', 'users','statuses'));
    }

    public function update(Request $request, string $id)
    {
        $ticket = Ticket::findOrFail($id);
        $request->validate([
            'status_id' => 'required|exists:statuses,id',
            'foto' => 'required'
        ]);
        if ($request->foto == $ticket->foto) {
            $fileName = $ticket->foto;
        } else {
            $file = $request->foto;
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('uploads', $fileName, 'public');
        }

        $ticket->update([
            'status_id' => $request->status_id,
            'foto' => $fileName,
            'deskripsi_pm' => $request->deskripsi_pm
        ]);

        if ($request->status_id == 2) {
            return redirect()->route('ticketMasuk')->with('success', 'Tiket berhasil diperbarui');
        } elseif ($request->status_id == 3) {
            return redirect()->route('ticketSelesai')->with('success', 'Tiket berhasil diperbarui');
        }  else{
            return redirect()->route('ticketSelesai')->with('success', 'Tiket berhasil diperbarui');
        }

        return redirect()->route('ticketSelesai')->with('success', 'Tiket berhasil diperbarui');
    }

    public function ticketMasuk()
    {
        $userId = Auth::id();
        $query = Ticket::where('teknisi', $userId)
                        ->whereIn('status_id', [1])
                        ->get();
        $tickets = NewTicketResource::collection($query);
        $users = User::where('role_id', 3)->get();

        return Inertia::render('MonitoringTiket/TiketMasuk', compact('tickets', 'users'));
    }

    public function ticketProgress()
    {
        $userId = Auth::id();
        $query = Ticket::where('teknisi', $userId)
                        ->whereIn('status_id', [2])
                        ->get();
        $tickets = NewTicketResource::collection($query);
        $users = User::where('role_id', 3)->get();

        return Inertia::render('MonitoringTiket/TiketProgress', compact('tickets', 'users'));
    }

    public function ticketSelesai()
    {
        $userId = Auth::id();
        $query = Ticket::where('teknisi', $userId)
                        ->whereIn('status_id', [3,4])
                        ->get();
        $tickets = NewTicketResource::collection($query);
        $users = User::where('role_id', 3)->get();

        return Inertia::render('MonitoringTiket/TiketSelesai', compact('tickets', 'users'));
    }

    public function readNotif(Request $request)
    {
        $notif = Auth::user()->unreadNotifications->find($request->id);
        $notif->markAsRead();
    }
}
