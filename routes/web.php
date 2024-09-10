<?php

use App\Http\Controllers\JabatanController;
use App\Http\Controllers\AkunKaryawanController;
use App\Http\Controllers\CaseCategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkalaLevelController;
use App\Http\Controllers\TeknisiController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\PelaporanTiketController;
use App\Http\Controllers\MonitoringTiketController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('master_jabatan', JabatanController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('skala_level', SkalaLevelController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('akun_karyawan',  AkunKaryawanController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('teknisi', TeknisiController::class)->only('index', 'store', 'update', 'destroy');
    Route::resource('case_category', CaseCategoryController::class)->only('index', 'store', 'update', 'destroy');

    Route::get('open_ticket', [TicketController::class, 'open_ticket'])->name('ticket.open');
    Route::post('open_ticket', [TicketController::class, 'store_ticket'])->name('ticket.store');

    Route::get('new_ticket', [TicketController::class, 'new_ticket'])->name('ticket.new');
    Route::get('/tickets/{id}/edit', [TicketController::class, 'edit'])->name('tickets.edit');
    Route::patch('/tickets/{ticket}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy'])->name('tickets.destroy');

    Route::get('proses_ticket', [TicketController::class, 'proses_ticket'])->name('ticket.proses');
    Route::get('solved_ticket', [TicketController::class, 'solved_ticket'])->name('ticket.solved');

    //user
    Route::get('pelaporan', [PelaporanTiketController::class, 'pelaporan'])->name('pelaporan');
    Route::post('pelaporan', [PelaporanTiketController::class, 'store_pelaporan'])->name('pelaporan.store');
    Route::get('monitor_tiket', [PelaporanTiketController::class, 'monitor_tiket'])->name('ticket.monitor');

    //teknisi
    Route::get('ticketMasuk', [MonitoringTiketController::class, 'ticketMasuk'])->name('ticketMasuk');
    Route::get('/ticketMasuk/{id}/edit', [MonitoringTiketController::class, 'edit'])->name('ticketMasuk.edit');
    Route::get('/ticketMasuk/{id}/detail', [MonitoringTiketController::class, 'detail'])->name('ticketMasuk.detail');
    Route::patch('/ticketMasuk/{ticket}', [MonitoringTiketController::class, 'update'])->name('ticketMasuk.update');
    Route::get('ticketProgress', [MonitoringTiketController::class, 'ticketProgress'])->name('ticketProgress');
    Route::get('ticketSelesai', [MonitoringTiketController::class, 'ticketSelesai'])->name('ticketSelesai');

    // nofif
    Route::post('readNotif', [MonitoringTiketController::class, 'readNotif'])->name('readNotif');
});

require __DIR__ . '/auth.php';
