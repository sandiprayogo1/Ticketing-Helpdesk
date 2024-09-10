<?php

namespace App\Notifications;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewTicket extends Notification implements ShouldBroadcast
{
    use Queueable;
    public $userid;
    public $data;

    /**
     * Create a new notification instance.
     */
    public function __construct($userid, $data)
    {
        $this->userid = $userid;
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'ticket_id' => $this->data->id,
            'nomor_ticket' => $this->data->nomor_ticket,
        ];
    }

    public function broadcastOn()
    {
        return new PrivateChannel('App.Models.User.' . $this->userid);
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'ticket_id' => $this->data->id,
            'nomor_ticket' => $this->data->nomor_ticket,
        ]);
    }
}
