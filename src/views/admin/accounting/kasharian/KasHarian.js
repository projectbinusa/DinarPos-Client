import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";

function KasHarian() {
  const tableRef = useRef(null);
  const [datas, setdatas] = useState();

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  useEffect(() => {
    if (datas && datas.length > 0) {
      initializeDataTable();
    }
  }, [datas]);
  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Kas Harian
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/kas_harian">
              <span>Kas Harian</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <form>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                // onChange={(e) => settglAwal(e.target.value)}
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
                // onChange={(e) => settglAkhir(e.target.value)}
              />
            </div>
            <Button className="mt-5" color="blue" type="submit">
              Export
            </Button>
          </form>
          <br />
          <hr />
          <br />
          <div className="rounded mb-5 p-1 overflow-x-auto">
            <div className="flex justify-end">
              <a href="/add_saldo">
                <Button color="blue" type="submit">
                  Tambah Saldo
                </Button>
              </a>
            </div>
            <br />
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Shift</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Saldo Awal (Rp)
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Setor Kas Besar (Rp)
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              {/* <tbody>
                {piutangs.length > 0 ? (
                  piutangs.map((piutang, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {piutang.created_date}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {piutang.noFaktur}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {piutang.customer.nama_customer}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {piutang.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2">
                          <a
                            href={
                              "/pelunasan_piutang/" +
                              piutang.idTransaksi
                            }
                          >
                            <IconButton size="md" color="light-blue">
                              <PenIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton size="md" color="red">
                              <TrashIcon className="w-6 h-6 white" />
                            </IconButton>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody> */}
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default KasHarian;
