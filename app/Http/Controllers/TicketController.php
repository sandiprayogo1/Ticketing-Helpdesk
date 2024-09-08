<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Resources\MasterCaseCategoryResource;
use App\Http\Resources\MasterSkalaLevelResource;
use App\Http\Resources\MonitoringTicketResource;
use App\Http\Resources\NewTicketResource;
use App\Http\Resources\MasterKaryawanResource;
use App\Models\User;
use App\Models\Status;
use App\Models\CaseCategory;
use App\Models\SkalaLevel;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Implementasi untuk menampilkan daftar tiket bisa ditambahkan di sini
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Implementasi untuk menampilkan form pembuatan tiket baru
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementasi untuk menyimpan tiket baru
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Implementasi untuk menampilkan detail tiket tertentu
    }

    /**
     * Show the form for editing the specified resource.
     */
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

        return Inertia::render('Ticket/EditTicketPage', compact('ticket', 'users','statuses'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userId = Auth::user()->role_id;
        $ticket = Ticket::findOrFail($id);
        $request->validate([
            'teknisi' => 'required',
            'status_id' => 'required|exists:statuses,id',
        ]);

        $ticket->update([
            'teknisi' => $request->teknisi,
            'status_id' => $request->status_id,
        ]);

        if ($userId == 3) {
            if ($request->status_id == 2) {
                return redirect()->route('ticketProgress')->with('success', 'Tiket berhasil diperbarui');
            } elseif ($request->status_id == 3) {
                return redirect()->route('ticketSelesai')->with('success', 'Tiket berhasil diperbarui');
            }  else{
                return redirect()->route('ticketSelesai')->with('success', 'Tiket berhasil diperbarui');
            }
        }

        if ($request->status_id == 1) {
            return redirect()->route('ticket.new')->with('success', 'Tiket berhasil diperbarui');
        } elseif ($request->status_id == 2) {
            return redirect()->route('ticket.proses')->with('success', 'Tiket berhasil diperbarui');
        } else{
            return redirect()->route('ticket.solved')->with('success', 'Tiket berhasil diperbarui');
        }

        return redirect()->route('ticket.new')->with('success', 'Tiket berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        return redirect()->route('ticket.new')->with('success', 'Tiket berhasil dihapus');
    }

    public function open_ticket()
    {
        $level = MasterSkalaLevelResource::collection(SkalaLevel::all());
        $case_category = MasterCaseCategoryResource::collection(CaseCategory::all());
        $users = User::where('role_id', 2)->get();

        return Inertia::render('Ticket/OpenTicket', compact('level', 'case_category', 'users'));
    }

    public function store_ticket(StoreTicketRequest $request)
    {
        // $requester = Auth::id();
        Ticket::create([
            "nomor_ticket"  => Ticket::nomorTicket(),
            "requester"     => $request->user_id,
            "case_category_id" => $request->case_category_id,
            "level"         => $request->level,
            "tempat"        => $request->tempat,
            "deskripsi"     => $request->deskripsi,
            "status_id"     => 1
        ]);

        return redirect()->route('ticket.open')->with('success', 'Laporan anda berhasil dibuat');
    }

    public function new_ticket()
    {
        $query = Ticket::where('status_id', 1)->get();
        $tickets = NewTicketResource::collection($query);
        $users = User::where('role_id', 3)->get();
        return Inertia::render('Ticket/NewTicket', compact('tickets','users'));
    }

    public function proses_ticket()
    {
        $query = Ticket::where('status_id', 2)->get();
        $tickets = NewTicketResource::collection($query);
        $users = User::where('role_id', 3)->get();
        return Inertia::render('Ticket/ProsesTicket', compact('tickets','users'));
    }

    public function solved_ticket()
    {
        $query = Ticket::whereIn('status_id', [3,4])->get();
        $tickets = NewTicketResource::collection($query);
        $users = User::where('role_id', 3)->get();
        return Inertia::render('Ticket/SolvedTicket', compact('tickets','users'));
    }
}
