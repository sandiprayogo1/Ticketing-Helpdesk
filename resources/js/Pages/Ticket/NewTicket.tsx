import ConfirmDelete from "@/Components/ConfirmDelete";
import { Link } from "@inertiajs/react"; // Gunakan Link untuk mengarahkan ke halaman lain
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button"; // Mengimpor komponen Button
import { Edit, Eye } from "lucide-react"; // Mengimpor ikon Edit dari lucide-react

import React from "react";

interface Ticket {
  id: number;
  nomor_ticket: string;
  category: string;
  requester: string;
  level: string;
  tempat: string;
  bagian: string;
  teknisi: number; 
  status: string;
  request_date: string;
}

interface CustomPageProps extends PageProps {
  tickets: Ticket[];
  teknisiOptions?: { id: number; name: string }[];
}

const NewTicket = ({ auth }: PageProps) => {
  const { tickets } = usePage<CustomPageProps>().props;
  const { delete: destroy } = useForm();
console.log(tickets)
  const handleDelete = (id: number) => {
    destroy(route("tickets.destroy", id), {
      preserveScroll: true,
    });
  };

  return (
    <Authenticated user={auth.user} header={<h2 className="header-text">Tiket Baru</h2>}>
      <div className="py-12">
        <div className="container-size">
          <div className="card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nomor Ticket</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Level Prioritas</TableHead>
                  <TableHead>Tempat</TableHead>
                  <TableHead>Bagian</TableHead>
                  <TableHead>Teknisi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Opsi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{ticket.nomor_ticket}</TableCell>
                    <TableCell>{ticket.requester}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{ticket.level}</TableCell>
                    <TableCell>{ticket.tempat}</TableCell>
                    <TableCell>{ticket.bagian}</TableCell>
                    <TableCell>{ticket.teknisi}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.request_date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={route('ticketMasuk.detail', ticket.id)}>
                          <Button size="icon">
                            <Eye size={20} />
                          </Button>
                        </Link>
                        {/* Link ke halaman EditTicket */}
                        <Link href={route('tickets.edit', ticket.id)}>
                          <Button size="icon">
                            <Edit size={20} />
                          </Button>
                        </Link>
                        {/* Tombol Hapus */}
                        <ConfirmDelete onConfirm={() => handleDelete(ticket.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default NewTicket;
