import React, { useEffect, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

interface Ticket {
  id: number;
  nomor_ticket: string;
  category: string;
  requester: string;
  level: string;
  tempat: string;
  deskripsi: string;
  bagian: string;
  teknisi: number;
  status: string;
  request_date: string;
  foto: string;
  deskripsi_pm: string;
}

interface DetailMonitoringTiketProps extends PageProps {
  ticket: Ticket;
}

const DetailMonitoringTiket = ({ auth }: PageProps) => {
  const { ticket } = usePage<DetailMonitoringTiketProps>().props;
  console.log(ticket)
  return (
    <Authenticated user={auth.user} header={<h2 className="header-text">Edit Tiket</h2>}>
      <div className="py-12">
        <div className="container-size">
          <div className="card p-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-6">
                    <div>Nomor Tiket: {ticket.nomor_ticket}</div>
                    <div>Kategori: {ticket.category}</div>
                    <div>Deskripsi: {ticket.deskripsi}</div>
                    <div>Level: {ticket.level}</div>
                    <div>Tempat: {ticket.tempat}</div>
                    <div>Bagian: {ticket.bagian}</div>
                    <div>Requester: {ticket.requester}</div>
                    <div>Tanggal Request: {ticket.request_date}</div>
                    <div>Teknisi: {ticket.teknisi}</div>
                    <div>Status: {ticket.status}</div>
                </div>
                {ticket.foto !== null && (
                    <div className="space-y-6">
                        <div>Deskripsi Penyelesaian Masalah: {ticket.deskripsi_pm}</div>
                        <img src={`/storage/uploads/${ticket.foto}`} className="w-50" />
                    </div>
                )}
            </div>


            <div className="flex items-center justify-end">
            <Button onClick={() => window.history.back()} className="ml-5 px-4 py-2 bg-black text-white rounded-md hover:bg-blac">
                Kembali
            </Button>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default DetailMonitoringTiket;
