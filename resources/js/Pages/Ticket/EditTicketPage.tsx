import React, { useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError"; // Pastikan impor benar
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

interface User {
  id: number;
  name: string;
}

interface Ticket {
  id: number;
  teknisi: number;
  status_id: number; // Updated to use status_id
}

interface Status {
  id: number;
  status: string;
}

interface EditTicketPageProps extends PageProps {
  ticket: Ticket;
  users: User[]; // Daftar semua user yang bisa dipilih sebagai teknisi
  statuses: Status[]; // Daftar semua status yang bisa dipilih
}

const EditTicketPage = ({ auth }: PageProps) => {
  const { ticket, users, statuses } = usePage<EditTicketPageProps>().props;

  const { data, setData, patch, processing, errors } = useForm({
    teknisi: ticket.teknisi,
    status_id: ticket.status_id, // Initialize with the current status ID
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patch(route("tickets.update", ticket.id), {
      onSuccess: () => {
        // Redirect or show a success message
      },
    });
  };

  return (
    <Authenticated user={auth.user} header={<h2 className="header-text">Edit Tiket</h2>}>
      <div className="py-12">
        <div className="container-size">
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="teknisi">Pilih Teknisi</Label>
                <select
                  id="teknisi"
                  value={data.teknisi}
                  onChange={(e) => setData("teknisi", Number(e.target.value))} // Mengubah nilai menjadi number
                  className="form-select block w-full mt-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <InputError message={errors.teknisi} />
              </div>

              <div>
                <Label htmlFor="status_id">Ubah Status</Label>
                <select
                  id="status_id"
                  value={data.status_id}
                  onChange={(e) => setData("status_id", Number(e.target.value))} // Mengubah nilai menjadi number
                  className="form-select block w-full mt-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.status}
                    </option>
                  ))}
                </select>
                <InputError message={errors.status_id} />
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" disabled={processing}>
                  Update Tiket
                </Button>
                <Link href={route("ticket.new")} className="ml-5 px-4 py-2 bg-black text-white rounded-md hover:bg-blac">
                  Kembali
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default EditTicketPage;
