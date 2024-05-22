import SidebarAdmin from "../../../component/SidebarAdmin"; // Ensure this path is correct
import {
  Breadcrumbs,
  Button,
  // IconButton, // Commented out as it's not used in the current code
  Typography,
} from "@material-tailwind/react"; // Ensure this path is correct
// import { InformationCircleIcon } from "@heroicons/react/outline"; // Commented out as it's not used in the current code
import "datatables.net";
import "./../../../assets/styles/datatables.css"; // Ensure this path is correct

function DataBon() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Bon Barang
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
            <a href="/data_bon-barang">
              <span>DataBon</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_bonbarang" className="float-right mb-5">
            <Button variant="gradient" color="blue">
              Tambah
            </Button>
          </a>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              //   ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">
                    No TT Baru
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    No TT Lama
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat</th>
                  <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                  <th className="text-sm py-2 px-3 font-semibold">IN</th>
                  <th className="text-sm py-2 px-3 font-semibold">C</th>
                  <th className="text-sm py-2 px-3 font-semibold">Status</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              {/* Uncomment and define returs data properly to use this section */}
              {/* <tbody>
                {returs.length > 0 ? (
                  returs.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{row.noTtBaru}</td>
                      <td className="text-sm py-2 px-3">{row.noTtLama}</td>
                      <td className="text-sm py-2 px-3">{row.nama}</td>
                      <td className="text-sm py-2 px-3">{row.alamat}</td>
                      <td className="text-sm py-2 px-3">{row.produk}</td>
                      <td className="text-sm py-2 px-3">{row.in}</td>
                      <td className="text-sm py-2 px-3">{row.c}</td>
                      <td className="text-sm py-2 px-3">{row.status}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <a href={"/detail_service/" + row.id}>
                            <IconButton size="md" color="light-blue">
                              <InformationCircleIcon className="w-6 h-6" />
                            </IconButton>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
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

export default DataBon;
