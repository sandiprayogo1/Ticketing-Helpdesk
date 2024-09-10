import { router } from "@inertiajs/react";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import echo from "@/echo";
import axios from "axios";

interface DataNotif {
    id: string;
    ticket_id: number;
    nomor_ticket: string;
    type: string;
}

interface Notification {
    created_at: string;
    data: DataNotif;
    id: string;
    notifiable_id: number;
    notifiable_type: string;
    read_at: string | null;
    type: string;
    updated_at: string;
}

function NotificationButton({ userId }: { userId: number }) {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        echo.private('App.Models.User.' + userId)
            .notification((e: any) => {
                setNotifications((prev) => [e, ...prev])
            });

        axios.post('/api/notifications', {
            id: userId
        })
        .then(({ data }: any) => {
            const newNotif = data.notifications.map((item: Notification) => ({
               ...item.data,
               id: item.id,
               type: item.type
            }))
            setNotifications(newNotif)
        })
        .catch((error) => console.log(error))
    }, []);

    const handleButtonClick = () => {
        setShowPopup(!showPopup);
    };

    const handlePopupClick = (data: DataNotif) => {
        router.post(route('readNotif'), { id: data.id, ticket_id: data.ticket_id })
    };

    // useEffect(() => {
    //     if (showPopup) {

    //     }
    // }, [showPopup]);

    return (
        <div className="relative">
            <button onClick={handleButtonClick} type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <Bell size={20} />
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {notifications.length ?? 0}
                </div>
            </button>

            {showPopup && (
                <div
                id="popup"
                className="absolute top-full right-0 bg-white rounded-lg shadow-md p-2"
                >
                <ul>
                    {notifications.map((e: any) => (
                    <li onClick={() => handlePopupClick(e)} key={e.id} className="p-2 cursor-pointer hover:bg-slate-100">
                        {e.nomor_ticket}
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
      );
}

export default NotificationButton;
