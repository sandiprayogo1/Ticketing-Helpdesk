import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage, useForm, Link } from "@inertiajs/react";
import { Eye } from "lucide-react";

import React from "react";

interface Ticket {
  id: number;
  nomor_ticket: string;
  category: string;
  requester: string;
  level: string;
  tempat: string;
  deskripsi: string;
  teknisi: number; 
  status: string;
  request_date: string;
}

interface CustomPageProps extends PageProps {
  tickets: Ticket[];
}

const MonitoringTiket = ({ auth }: PageProps) => {
  const { tickets } = usePage<CustomPageProps>().props;

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
                  <TableHead>Kategori</TableHead>
                  <TableHead>Level Prioritas</TableHead>
                  <TableHead>Tempat</TableHead>
                  <TableHead>Deskripsi</TableHead>
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
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{ticket.level}</TableCell>
                    <TableCell>{ticket.tempat}</TableCell>
                    <TableCell>{ticket.deskripsi}</TableCell>
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

export default MonitoringTiket;
