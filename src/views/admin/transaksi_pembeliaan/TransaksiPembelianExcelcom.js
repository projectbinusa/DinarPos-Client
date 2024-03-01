import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Typography,
  Input,
  Card,
} from "@material-tailwind/react";
import ReactSelect from "react-select";

function TransaksiPembelianExcelcom() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const TABLE_HEAD = [
    "Barcode",
    "Nama",
    "Harga",
    "Disc",
    "Harga Diskon",
    "Jumlah",
    "Total Harga",
    "Aksi",
  ];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };
  return (
    <section className="lg:flex font-poppins bg-gray-50 ">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            TRANSAKSI Pembelian Excelcom
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_admin" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/transaksi_pembelian_excelcom">
              <span>Pembelian Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        {/* FORM */}
        <form className="my-10">
          <div className="my-8">
            <Select
              variant="static"
              label="Data Suplier"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <div className="mt-5 flex gap-5">
              {/* MODAL TAMBAH SUPLIER */}
              <Button onClick={handleOpen} variant="gradient" color="blue">
                Tambah SUPLIER
              </Button>
              {/* END MODAL TAMBAH SUPLIER */}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5">
            <div className="col-span-2 mt-3">
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-y-8">
                <div className="lg:col-span-2">
                  <label
                    htmlFor="barang"
                    className="text-[14px] text-blue-gray-400"
                  >
                    Data Barang
                  </label>
                  <ReactSelect
                    id="barang"
                    options={[
                      { value: "bug", label: "Bug" },
                      { value: "feature", label: "Feature" },
                      { value: "documents", label: "Documents" },
                      { value: "discussion", label: "Discussion" },
                    ]}
                    placeholder="Search by tags"
                    styles={customStyles}
                  />
                  <hr className="mt-1 bg-gray-400 h-[0.1em]" />
                </div>
                <Input
                  color="blue"
                  variant="static"
                  label="Harga"
                  type="number"
                  placeholder="Masukkan Harga"
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Diskon (%)"
                  type="number"
                  placeholder="Masukkan Diskon"
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Stok Barang"
                  type="number"
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Jumlah"
                  type="number"
                  placeholder="Masukkan jumlah"
                />
              </div>
              <Button variant="gradient" color="blue" className="mt-5">
                <span>Tambah Barang</span>
              </Button>
              {/* <Button onClick={handleOpen2} variant="gradient" color="blue">
                Tambah customer CP
              </Button> */}

              <Card className="overflow-auto my-5">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map(({ name, job, date }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {job}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              Edit
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-12">
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph">Anda Hemat</Typography>
                  <Typography variant="h6">0</Typography>
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph" className="capitalize">
                    total Belanja Tanpa diskon
                  </Typography>
                  <Typography variant="h6">0</Typography>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 shadow-lg px-4 py-6 ">
              <Select
                variant="static"
                label="Cash / Kredit"
                color="blue"
                className="w-full"
              >
                <Option>Cash</Option>
                <Option>Kredit</Option>
              </Select>
              <div className="flex flex-col gap-y-6 my-6">
                <Input
                  color="blue"
                  variant="static"
                  label="Keterangan"
                  type="text"
                  placeholder="0"
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Pembayaran"
                  type="number"
                  placeholder="0"
                />
                <Input
                  color="blue"
                  variant="static"
                  label="Potongan"
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph">Total Belanja</Typography>
                  <Typography variant="h6">0</Typography>
                </div>
                <div className="bg-white shadow rounded px-3 py-2">
                  <Typography variant="paragraph">Kembalian</Typography>
                  <Typography variant="h6">0</Typography>
                </div>
              </div>
              <div className="bg-white shadow rounded px-3 py-2 mt-5">
                <p className="text-base my-2">
                  <b>Nota :</b> <span></span>
                </p>
                <hr />
                <h1 className="text-5xl my-1">0</h1>
              </div>
              <Button
                variant="gradient"
                color="blue"
                className="mt-5"
                type="submit"
              >
                <span>Lanjut</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
      {/* MODAL TAMBAH CUSTOMER */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Tambah Customer</DialogHeader>
        <form action="" className="">
          <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Select
              variant="static"
              label="Salesman"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Input
              color="blue"
              variant="static"
              label="Nama Customer"
              placeholder="Masukkan Nama Customer"
            />
            <Select
              variant="static"
              label="Jenis"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Input
              color="blue"
              variant="static"
              label="Alamat"
              placeholder="Masukkan Alamat Customer"
            />
            <Input
              color="blue"
              variant="static"
              label="Email"
              type="email"
              placeholder="Masukkan Email Customer"
            />
            <Input
              color="blue"
              variant="static"
              label="No Telp"
              type="number"
              placeholder="Masukkan No Telp Customer"
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen}
              type="submit"
            >
              <span>Simpan</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL TAMBAH CUSTOMER */}

      {/* MODAL TAMBAH CUSTOMER CP */}
      <Dialog open={open2} handler={handleOpen2} size="lg">
        <DialogHeader>Tambah Customer CP</DialogHeader>
        <form action="" className="">
          <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Select
              variant="static"
              label="Salesman"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Select
              variant="static"
              label="Customer"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Input
              color="blue"
              variant="static"
              label="Nama CP"
              placeholder="Masukkan Nama CP"
            />
            <Input
              color="blue"
              variant="static"
              label="Jabatan"
              placeholder="Masukkan Jabatan Customer"
            />
            <Input
              color="blue"
              variant="static"
              label="Email"
              type="email"
              placeholder="Masukkan Email Customer"
            />
            <Input
              color="blue"
              variant="static"
              label="No Telp"
              type="number"
              placeholder="Masukkan No Telp Customer"
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen2}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen2}
              type="submit"
            >
              <span>Simpan</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL TAMBAH CUSTOMER CP */}
    </section>
  );
}

export default TransaksiPembelianExcelcom;
