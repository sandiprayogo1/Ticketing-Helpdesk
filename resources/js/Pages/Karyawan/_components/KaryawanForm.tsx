import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { PageProps } from "@/types"
import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import InputError from "@/Components/InputError"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { bagianOptions } from "@/lib/data/bagian"

interface Jabatans {
  id: number
  jabatan: string
}

interface CustomPageProps extends PageProps {
  jabatans: Jabatans[]
}

interface KaryawanFormProps {
  id: number
  name: string
  email: string
  jabatan_id: number
  bagian: string
}

interface Karyawan {
  karyawan?: KaryawanFormProps
}

interface Bagian {
  value: string,
  text: string
}

const KaryawanForm = ({ karyawan }: Karyawan) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [bagian, setBagian] = useState<Bagian[]>([])
  const { jabatans } = usePage<CustomPageProps>().props
  const { patch, post, data, setData, processing, errors, reset } = useForm({
    id: karyawan?.id ?? "",
    name: karyawan?.name ?? "",
    email: karyawan?.email ?? "",
    jabatan_id: karyawan?.jabatan_id ?? "",
    bagian: karyawan?.bagian,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (karyawan) {
      patch(route("akun_karyawan.update", karyawan.id), {
        preserveScroll: true,
        onSuccess: () => {
          setIsOpen(false)
          reset()
        },
      })
    } else {
      post(route("akun_karyawan.store"), {
        preserveScroll: true,
        onSuccess: () => {
          setIsOpen(false)
          reset()
        },
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={karyawan ? "icon" : "sm"}>{karyawan ? <Edit size={20} /> : "Tambah Data"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Karyawan</DialogTitle>
          <DialogDescription className="pt-5" asChild>
            <div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label>Nama Karyawan</Label>
                  <Input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} autoFocus />
                  <InputError message={errors.name} />
                </div>
                <div className="space-y-2">
                  <Label>Email Karyawan</Label>
                  <Input type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                  <InputError message={errors.email} />
                </div>
                <div className="space-y-2">
                  <Label>Jabatan</Label>
                  <Select onValueChange={(value) => setData("jabatan_id", value)} defaultValue={data.jabatan_id.toString()}>
                    <SelectTrigger className={`${errors.jabatan_id ? "border border-red-500" : ""}`}>
                      <SelectValue placeholder="Tentukan Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jabatans.map((jabatan) => (
                        <SelectItem key={jabatan.id} value={jabatan.id.toString()}>
                          {`${jabatan.jabatan}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.jabatan_id} />
                </div>
                <div className="space-y-2">
                  <Label>Bagian</Label>
                  <Select onValueChange={(value) => setData("bagian", value)} defaultValue={data.bagian}>
                    <SelectTrigger className={`${errors.jabatan_id ? "border border-red-500" : ""}`}>
                      <SelectValue placeholder="Tentukan Bagian" />
                    </SelectTrigger>
                    <SelectContent>
                      {bagianOptions.map((bagian) => (
                        <SelectItem key={bagian.value} value={bagian.value}>
                          {`${bagian.text}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.bagian} />
                </div>
                <Button className="w-full" disabled={processing}>
                  Save
                </Button>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default KaryawanForm
