import { Link } from "@inertiajs/react";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage, useForm, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Check, Eye } from "lucide-react";
import ConfirmAccept from "@/Components/ConfirmAccept";

interface Ticket {
  id: number;
  nomor_ticket: string;
  category: string;
  requester: string;
  level: string;
  tempat: string;
  bagian: string;
  teknisi: string;
  status: string;
  request_date: string;
  teknisi_id: number;
}

interface CustomPageProps extends PageProps {
  tickets: Ticket[];
  teknisiOptions?: { id: number; name: string }[];
}

const TiketMasuk = ({ auth }: PageProps) => {
  const { tickets } = usePage<CustomPageProps>().props;
  const { patch } = useForm();

  const handleAccept = (ticket: Ticket) => {
    router.post(route("tickets.update", ticket.id), {
        _method: 'patch',
        teknisi: ticket.teknisi_id,
        status_id: 2
    })
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
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.request_date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={route('ticketMasuk.detail', ticket.id)}>
                          <Button size="icon">
                            <Eye size={20} />
                          </Button>
                        </Link>
                        <ConfirmAccept onConfirm={() => handleAccept(ticket)} />
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

export default TiketMasuk;
