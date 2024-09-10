import { router } from "@inertiajs/react";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketNotif {
    id: number;
    nomor_ticket: string;
}

interface Notif {
    created_at: string;
    data: TicketNotif;
    id: string;
    notifiable_id: number;
    notifiable_type: string;
    read_at: string | null;
    type: string;
    updated_at: string;
}

function NotificationButton({ notifications }: { notifications: Notif[] }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handlePopupClick = async (data: TicketNotif, id: string) => {
        await router.post(route('readNotif'), { id: id })
        router.get(route("ticketMasuk.detail", data.id))
    };

    // useEffect(() => {
    //     if (isPopupVisible) {

    //     }
    // }, [isPopupVisible]);

    return (
        <div className="relative">
            <button onClick={handleButtonClick} type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <Bell size={20} />
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {notifications.length ?? 0}
                </div>
            </button>

            {isPopupVisible && (
                <div
                id="popup"
                className="absolute top-full right-0 bg-white rounded-lg shadow-md p-2"
                >
                <ul>
                    {notifications.map((notification) => (
                    <li onClick={() => handlePopupClick(notification.data, notification.id)} key={notification.id} className="p-2 cursor-pointer hover:bg-slate-100">
                        {notification.data.nomor_ticket}
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
      );
}

export default NotificationButton;
