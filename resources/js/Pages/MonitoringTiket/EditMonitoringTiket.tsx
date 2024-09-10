import React, { useEffect, useState } from "react";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea"
import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

interface User {
  id: number;
  name: string;
}

interface Ticket {
  id: number;
  teknisi: number;
  foto: File | null;
  status_id: number;
  deskripsi_pm: string;
}

interface Status {
  id: number;
  status: string;
}

interface EditMonitoringTiketProps extends PageProps {
  ticket: Ticket;
  users: User[];
  statuses: Status[];
}

const EditMonitoringTiket = ({ auth }: PageProps) => {
  const { ticket, users, statuses } = usePage<EditMonitoringTiketProps>().props;
  const [preview, setPreview] = useState<string | null>(null)

  const { data, setData, post, processing, errors } = useForm({
    teknisi: ticket.teknisi,
    foto: ticket.foto || null,
    status_id: ticket.status_id,
    deskripsi_pm: ticket.deskripsi_pm
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setData("foto", e.currentTarget.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e?.target?.result as string);
      }

      reader.readAsDataURL(e.currentTarget.files[0])
    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(route("ticketMasuk.update", ticket.id), {
      _method: 'patch',
      ...data
    })
  };

  return (
    <Authenticated user={auth.user} header={<h2 className="header-text">Edit Tiket</h2>}>
      <div className="py-12">
        <div className="container-size">
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div className="container">
                {data.foto !== null && (
                  preview
                    ? (<img src={preview} alt="Preview" className="w-50" />)
                    : (<img src={`/storage/uploads/${data.foto}`} className="w-50" />)
                )}
              </div>
              <div>
                <Label htmlFor="foto">Foto</Label>
                <Input
                  type="file"
                  id="foto"
                  onChange={handleFile}
                  className="form-select block w-full mt-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <Label htmlFor="deskripsi_pm">Deskripsi Penyelesaian Masalah</Label>
                <Textarea
                  id="deskripsi_pm"
                  name="deksripsi_pm"
                  onChange={(e) => setData("deskripsi_pm", e.target.value)}
                  value={data.deskripsi_pm}
                  className="form-select block w-full mt-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></Textarea>
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
                <Button type="button" onClick={() => window.history.back()} className="ml-5 px-4 py-2 bg-black text-white rounded-md hover:bg-blac">
                  Kembali
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default EditMonitoringTiket;
