import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./auth/Login";
import Dashboard from "./views/admin/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Loader from "./component/Loader";
import { useEffect, useState } from "react";
import TransaksiPenjualanExcelCom from "./views/admin/transaksi_penjualan/TransaksiPenjualanExcelCom";
import TransaksiPenjualanDinarPos from "./views/admin/transaksi_penjualan/TransaksiPenjualanDinarPos";
import TransaksiPembelianDinarpos from "./views/admin/transaksi_pembeliaan/TransaksiPembelianDinarpos";
import TransaksiPembelianExcelcom from "./views/admin/transaksi_pembeliaan/TransaksiPembelianExcelcom";
import DataCustomer from "./views/admin/data_user/customer/DataCustomer";
import DataCustomerCP from "./views/admin/data_user/DataCustomerCP";
import DataPengguna from "./views/admin/data_user/pengguna/DataPengguna";
import AddCustomer from "./views/admin/data_user/customer/AddCustomer";
import AddSalesman from "./views/admin/data_user/salesman/AddSalesman";
import DataSalesman from "./views/admin/data_user/salesman/DataSalesman";
import DataSuplier from "./views/admin/data_user/suplier/DataSuplier";
import AddSuplier from "./views/admin/data_user/suplier/AddSuplier";
import AddPengguna from "./views/admin/data_user/pengguna/AddPengguna";
import DataBarang from "./views/admin/data_barang/barang/DataBarang";
import AddBarang from "./views/admin/data_barang/barang/AddBarang";
import StokMasuk from "./views/admin/data_barang/stok_masuk/StokMasuk";
import AddStokMasuk from "./views/admin/data_barang/stok_masuk/AddStokMasuk";
import StokOpname from "./views/admin/data_barang/stok_opname/StokOpname";
import AddStokOpname from "./views/admin/data_barang/stok_opname/AddStokOpname";
import PenjualanReturn from "./views/admin/return_excelcom/penjualan/PenjualanReturn";
import PenjualanBarangReturn from "./views/admin/return_excelcom/PenjualanBarangReturn";
import PembelianReturn from "./views/admin/return_excelcom/pembelian/PembelianReturn";
import PembelianBarangReturn from "./views/admin/return_excelcom/PembelianBarangReturn";
import EditSuplier from "./views/admin/data_user/suplier/EditSuplier";
import EditBarang from "./views/admin/data_barang/barang/EditBarang.js";
import EditCustomer from "./views/admin/data_user/customer/EditCustomer.js";
import EditCustomerCp from "./views/admin/data_user/customer/EditCustomerCp.js";
import EditPengguna from "./views/admin/data_user/pengguna/EditPengguna.js";
import EditSalesman from "./views/admin/data_user/salesman/EditSalesman.js";
import Register from "./auth/Register.js";
import PenjualanReturnDinar from "./views/admin/return_dinar/penjualan/PenjualanReturnDinar.js";
import PembelianBarangReturnDinar from "./views/admin/return_dinar/PembelianBarangReturnDinar.js";
import PembelianReturnDinar from "./views/admin/return_dinar/pembelian/PembelianReturn.js";
import PenjualanBarangReturnDinar from "./views/admin/return_dinar/PenjualanBarangReturnDinar.js";
import Notifikasi7Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_7/Notifikasi7Excelcom.js";
import Notifikasi30Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_30/Notifikasi30Excelcom.js";
import Notifikasi90Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_90/Notifikasi90Excelcom.js";
import Notifikasi120Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_120/Notifikasi120Excelcom.js";
import Notifikasi365Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_365/Notifikasi365Excelcom.js";
import Notifikasi7Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_7/Notifikasi7Dinarpos.js";
import Notifikasi30Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_30/Notifikasi30Dinarpos.js";
import Notifikasi90Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_90/Notifikasi90Dinarpos.js";
import Notifikasi120Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_120/Notifikasi120Dinarpos.js";
import Notifikasi365Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_365/Notifikasi365Dinarpos.js";
import LaporanBarangDinar from "./views/admin/laporan_dinarpos/laporan_barang/LaporanBarangDinar.js";
import LaporanSuplierDinar from "./views/admin/laporan_dinarpos/laporan_suplier/LaporanSuplierDinar.js";
import LaporanSalesmanDinar from "./views/admin/laporan_dinarpos/laporan_salesman/LaporanSalesmanDinar.js";
import LaporanCustomerDinar from "./views/admin/laporan_dinarpos/laporan_customer/LaporanCustomerDinar.js";
import LaporanTransaksiBeliDinar from "./views/admin/laporan_dinarpos/laporan_transaksi_beli/LaporanTransaksiBeliDinar.js";
import LaporanBarangExcelcom from "./views/admin/laporan_excelcom/laporan_barang/LaporanBarangExcelcom.js";
import LaporanSuplierExcelcom from "./views/admin/laporan_excelcom/laporan_suplier/LaporanSuplierExcelcom.js";
import LaporanSalesmanExcelcom from "./views/admin/laporan_excelcom/laporan_salesman/LaporanSalesmanExcelcom.js";
import LaporanCustomerExcelcom from "./views/admin/laporan_excelcom/laporan_customer/LaporanCustomerExcelcom.js";
import LaporanTransaksiBeliExcelcom from "./views/admin/laporan_excelcom/laporan_transaksi_beli/LaporanTransaksiBeliExcelcom.js";
import CetakStrukExcelcom from "./views/admin/transaksi_pembeliaan/CetakStrukExcelcom.js";
import CetakStrukDinarpos from "./views/admin/transaksi_pembeliaan/CetakStrukDinarpos.js";
import CetakStrukPenjualanDinar from "./views/admin/transaksi_penjualan/CetakStrukPenjualanDinar.js";
import CetakStrukPenjualanExcelcom from "./views/admin/transaksi_penjualan/CetakSturkPenjualanExcelcom.js";
import DetailHistoriSalesmanExcelcom from "./views/admin/laporan_excelcom/laporan_salesman/DetailHistoriSalesmanExcelcom.js";
import PrintHistoriTransaksiExcelcom from "./views/admin/laporan_excelcom/laporan_salesman/PrintHistoriTransaksiExcelcom.js";
import DetailHistoriTransaksiBeliExcelcom from "./views/admin/laporan_excelcom/laporan_transaksi_beli/DetailHistoriTransaksiBeliExcelcom.js";
import PrintHistoriTransaksiBeliExcelcom from "./views/admin/laporan_excelcom/laporan_transaksi_beli/PrintHistoriTransaksiBeliExcelcom.js";
import DetailHistoriSalesmanDinarpos from "./views/admin/laporan_dinarpos/laporan_salesman/DetailHistoriSalesmanDinarpos.js";
import PrintHistoriTransaksiDinarpos from "./views/admin/laporan_dinarpos/laporan_salesman/PrintHistoriTransaksiDinarpos.js";
import DetailHistoriTransaksiBeliDinarpos from "./views/admin/laporan_dinarpos/laporan_transaksi_beli/DetailHistoriTransaksiBeliDinarpos.js";
import PrintHistoriTransaksiBeliDinarpos from "./views/admin/laporan_dinarpos/laporan_transaksi_beli/PrintHistoriTransaksiBeliDinarpos.js";
import TanggalFilterSalesmanExcelcom from "./views/admin/laporan_excelcom/laporan_salesman/TanggalFilterSalesmanExcelcom.js";
import PrintPembelianReturnDinarpos from "./views/admin/return_dinar/pembelian/PrintPembelianReturnDinarpos.js";
import DetailPembelianReturnDinarpos from "./views/admin/return_dinar/pembelian/DetailPembelianReturnDinarpos.js";
import PrintPenjualanReturnDinarpos from "./views/admin/return_dinar/penjualan/PrintPenjualanReturnDinarpos.js";
import DetailPenjualanReturnDinarpos from "./views/admin/return_dinar/penjualan/DetailPenjualanReturnDinarpos.js";
import PrintPembelianReturnExcelcom from "./views/admin/return_excelcom/pembelian/PrintPembelianReturnExcelcom.js";
import DetailPembelianReturnExcelcom from "./views/admin/return_excelcom/pembelian/DetailPembelianReturnExcelcom.js";
import PrintPenjualanReturnExcelcom from "./views/admin/return_excelcom/penjualan/PrintPenjualanReturnExcelcom.js";
import DetailPenjualanReturnExcelcom from "./views/admin/return_excelcom/penjualan/DetailPenjualanReturnExcelcom.js";
import PrintHistoriDinarpos from "./views/admin/notifikasi_dinarpos/PrintHistoriDinarpos.js";
import PrintHistoriExcelcom from "./views/admin/notifikasi_excelcom/PrintHistoriExcelcom.js";
import Konfirmasi7Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_7/Konfirmasi7Excelcom.js";
import Konfirmasi30Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_30/Konfirmasi30Excelcom.js";
import Konfirmasi90Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_90/Konfirmasi90Excelcom.js";
import Konfirmasi120Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_120/Konfirmasi120Excelcom.js";
import Konfirmasi365Excelcom from "./views/admin/notifikasi_excelcom/notifikasi_365/Konfirmasi365Excelcom.js";
import Konfirmasi7Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_7/Konfirmasi7Dinarpos.js";
import Konfirmasi30Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_30/Konfirmasi30Dinarpos.js";
import Konfirmasi90Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_90/Konfirmasi90Dinarpos.js";
import Konfirmasi365Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_365/Konfirmasi365Dinarpos.js";
import Konfirmasi120Dinarpos from "./views/admin/notifikasi_dinarpos/notifikasi_120/Konfirmasi120Dinarpos.js";
import TglFilterSalesmanDinarpos from "./views/admin/laporan_dinarpos/laporan_salesman/TglFilterSalesmanDinarpos.js";
import TanggalFilterBarangExcelcom from "./views/admin/laporan_excelcom/laporan_barang/TanggalFilterBarangExcelcom.js";
import TanggalFilterBarangDinarpos from "./views/admin/laporan_dinarpos/laporan_barang/TanggalFilterBarangDinarpos.js";
import TanggalFilterSuplierDinarpos from "./views/admin/laporan_dinarpos/laporan_suplier/TanggalFilterSuplierDinarpos.js";
import TanggalFilterCustomerDinarpos from "./views/admin/laporan_dinarpos/laporan_customer/TanggalFilterCustomerDinarpos.js";
import TglFilterTransaksiBeliDinarpos from "./views/admin/laporan_dinarpos/laporan_transaksi_beli/TglFilterTransaksiBeliDinarpos.js";
import TanggalFilterSuplierExcelcom from "./views/admin/laporan_excelcom/laporan_suplier/TanggalFilterSuplierExcelcom.js";
import TanggalFilterCustomerExcelcom from "./views/admin/laporan_excelcom/laporan_customer/TanggalFilterCustomerExcelcom.js";
import TglFilterTransaksiBeliExcelcom from "./views/admin/laporan_excelcom/laporan_transaksi_beli/TglFilterTransaksiBeliExcelcom.js";
import UbahPassword from "./views/admin/UbahPassword.js";
import TransaksiIndentExcelcom from "./views/admin/transaksi_indent/excelcom/TransaksiIndentExcelcom.js";
import TransaksiIndentDinarpos from "./views/admin/transaksi_indent/dinarpos/TransaksiIndentDinarpos.js";
import AddIndentExcelcom from "./views/admin/transaksi_indent/excelcom/AddIndentExcelcom.js";
import AddIndentDinarpos from "./views/admin/transaksi_indent/dinarpos/AddIndentDinarpos.js";
import CetakIndentExcelcom from "./views/admin/transaksi_indent/excelcom/CetakIndentExcelcom.js";
import CetakIndentDinarpos from "./views/admin/transaksi_indent/dinarpos/CetakIndentDinarpos.js";
import Hutang from "./views/admin/accounting/hutang/Hutang.js";
import Piutang from "./views/admin/accounting/piutang/Piutang.js";
import PelunasanPiutang from "./views/admin/accounting/piutang/PelunasanPiutang.js";
import PelunasanHutang from "./views/admin/accounting/hutang/PelunasanHutang.js";
import DataTeknisi from "./views/services/teknisi/DataTeknisi.js";
import AddTeknisi from "./views/services/teknisi/AddTeknisi.js";
import EditTeknisi from "./views/services/teknisi/EditTeknisi.js";
import DataService from "./views/services/service/DataService.js";
import AddService from "./views/services/service/AddService.js";
import PrintService from "./views/services/service/PrintService.js";
import DetailService from "./views/services/service/DetailService.js";
import DataRetur from "./views/services/retur/DataRetur.js";
import EntriRetur from "./views/services/retur/EntriRetur.js";
import TakeOver from "./views/services/take_over/TakeOver.js";
import DataPoin from "./views/services/point/DataPoin.js";
import PointTeknisi from "./views/services/point/PointTeknisi.js";
import AddPoint from "./views/services/point/AddPoint.js";
import Garansi from "./views/services/garansi/Garansi.js";
import AddGaransi from "./views/services/garansi/AddGaransi.js";
import HistoryPoint from "./views/services/point/HistoryPoint.js";
import DataFinish from "./views/services/finish/DataFinish.js";
import DataBon from "./views/services/bon/DataBon.js";
import AddBonBarang from "./views/services/bon/AddBonBarang.js";
import AddRetur from "./views/services/retur/AddRetur.js";
import DashboardTeknisi from "./views/serviceteknisi/DashboardTeknisi.js";
import DetailServiceTeknisi from "./views/serviceteknisi/DetailServiceTeknisi.js";
import EditData from "./views/services/edit_data/EditData.js";
import EditGaransi from "./views/services/garansi/EditGaransi.js";
import EditBonBarang from "./views/services/bon/EditBonBarang.js";
import GrafikPoin from "./views/services/point/GrafikPoin.js";
import ServiceCancelTeknisi from "./views/serviceteknisi/ServiceCancelTeknisi.js";
import ServiceTeknisi from "./views/serviceteknisi/ServiceTeknisi.js";
import ServiceReturTeknisi from "./views/serviceteknisi/ServiceReturTeknisi.js";
import DashboardPimpinan from "./views/servicepimpinan/DashboardPimpinan.js";
import DataServiceTaken from "./views/services/service/DataServiceTaken.js";
import DetailServicePimpinan from "./views/servicepimpinan/DetailServicePimpinan.js";
import KasHarian from "./views/admin/accounting/kasharian/KasHarian.js";
import AddSaldo from "./views/admin/accounting/kasharian/AddSaldo.js";
import EditSaldo from "./views/admin/accounting/kasharian/EditSaldo.js";
import AddTransaksiFromIndentExcelcom from "./views/admin/transaksi_indent/excelcom/AddTransaksiFromIndentExcelcom.js";
import AddTransaksiFromIndentDinarpos from "./views/admin/transaksi_indent/dinarpos/AddTransaksiFromIndentDinarpos.js";
import DashboardAdminService from "./views/services/DashboardAdminService.js";
import DetailServiceTaken from "./views/services/service/DetailServiceTaken.js";
import LaporanMarketting from "./views/admin/accounting/laporan_marketting/LaporanMarketting.js";
import LaporanPendapatan from "./views/services/laporan/LaporanPendapatan.js";
import LaporanStatusService from "./views/services/laporan/LaporanStatusService.js";
import LaporanService from "./views/services/laporan/LaporanService.js";
import DataItc from "./views/itc/itc/DataItc.js";
import AddItc from "./views/itc/itc/AddItc.js";
import EditItc from "./views/itc/itc/EditItc.js";
import Home from "./views/itc/home/Home.js";
import Kunjungan from "./views/itc/kunjungan/Kunjungan.js";
import DealPo from "./views/itc/dealpo/DealPo.js";
import DetailKunjungan from "./views/itc/kunjungan/DetailKunjungan.js";
import DataPlanning from "./views/itc/planning/marketting/DataPlanning.js";
import DetailPlanning from "./views/itc/planning/marketting/DetailPlanning.js";
import InputPlanning from "./views/itc/planning/marketting/InputPlanning.js";
import PrintKunjungan from "./views/itc/printkunjungan/PrinterKunjungan.js";
import ByMonthKunjungan from "./views/itc/by_month_kunjungan/ByMonthKunjungann.js";
import DailyRepost from "./views/itc/dailyreport/DailyReport.js";
import DetailKunjunganHari from "./views/itc/detailkunjunganperhari/DetailKunjunganHari.js";
import ExportLaporan from "./views/itc/ExportLaporan.js";
import LapSync from "./views/itc/laporan/LapSync.js";
import LapDisiplin from "./views/itc/laporan/LapDisiplin.js";
import Preparation from "./views/itc/laporan/Preparation.js";
import DetailCustomer from "./views/admin/data_user/customer/DetailCustomer.js";
import InputKunjungan from "./views/itc/kunjungan/InputKunjungan.js";
import DetailSync from "./views/itc/laporan/DetailSync.js";
import LapAdminItc from "./views/itc/laporan/LapAdminItc.js";
import LapKunjungan from "./views/itc/laporan/LapKunjungan.js";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/r3+91s+t3r" component={Register} exact />
            {/* ROLE ADMIN */}
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/ubah_password"
              component={UbahPassword}
              isAuthenticated={true}
            />

            {/* TRANSAKSI PENJUALAN */}
            <PrivateRoute
              path="/transaksi_penjualan_excelcom"
              component={TransaksiPenjualanExcelCom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/transaksi_penjualan_dinarpos"
              component={TransaksiPenjualanDinarPos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/cetak_struk_transaksi_penjualan_dinarpos/:id"
              component={CetakStrukPenjualanDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/cetak_struk_transaksi_penjualan_excelcom/:id"
              component={CetakStrukPenjualanExcelcom}
              isAuthenticated={true}
            />

            {/* TRANSAKSI PEMBELIAN */}
            <PrivateRoute
              path="/transaksi_pembelian_excelcom"
              component={TransaksiPembelianExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/transaksi_pembelian_dinarpos"
              component={TransaksiPembelianDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/cetak_struk_pembelian_excelcom/:id"
              component={CetakStrukExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/cetak_struk_transaksi_beli_dinarpos/:id"
              component={CetakStrukDinarpos}
              isAuthenticated={true}
            />
            {/* DATA USER */}

            {/* DATA CUSTOMER */}
            <PrivateRoute
              path="/data_customer"
              component={DataCustomer}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_customer"
              component={AddCustomer}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_customer/:id"
              component={EditCustomer}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_customer_cp/:id"
              component={EditCustomerCp}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/data_customer_cp"
              component={DataCustomerCP}
              isAuthenticated={true}
            />
            {/* END DATA CUSTOMER */}

            {/* DATA SUPLIER */}
            <PrivateRoute
              path="/data_suplier"
              component={DataSuplier}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_suplier"
              component={AddSuplier}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_suplier/:id"
              component={EditSuplier}
              isAuthenticated={true}
            />
            {/* END DATA SUPLIER */}

            {/* DATA SALESMAN */}
            <PrivateRoute
              path="/data_salesman"
              component={DataSalesman}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_salesman"
              component={AddSalesman}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_salesman/:id"
              component={EditSalesman}
              isAuthenticated={true}
            />
            {/* END DATA SALESMAN */}

            {/* DATA PENGGUNA */}
            <PrivateRoute
              path="/data_pengguna"
              component={DataPengguna}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_pengguna"
              component={AddPengguna}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_pengguna/:id"
              component={EditPengguna}
              isAuthenticated={true}
            />
            {/* END DATA PENGGUNA */}

            {/* END DATA USER */}

            {/* DATA BARANG */}
            <PrivateRoute
              path="/data_barang"
              component={DataBarang}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_barang"
              component={AddBarang}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_barang/:id"
              component={EditBarang}
              isAuthenticated={true}
            />

            {/* STOK MASUK BARANG */}
            <PrivateRoute
              path="/stok_masuk_barang"
              component={StokMasuk}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_stok_masuk"
              component={AddStokMasuk}
              isAuthenticated={true}
            />
            {/* END STOK MASUK BARANG */}

            {/* STOK KELUAR BARANG */}
            <PrivateRoute
              path="/stok_keluar_barang"
              component={StokOpname}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_stok_keluar"
              component={AddStokOpname}
              isAuthenticated={true}
            />
            {/* END STOK KELUAR BARANG */}

            {/* END DATA BARANG */}

            {/* RETURN EXCELCOM */}
            <PrivateRoute
              path="/penjualan_return_excelcom"
              component={PenjualanReturn}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_penjualan_return_excelcom/:id"
              component={PrintPenjualanReturnExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_penjualan_return_excelcom/:id"
              component={DetailPenjualanReturnExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/penjualan_barang_return_excelcom"
              component={PenjualanBarangReturn}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/pembelian_return_excelcom"
              component={PembelianReturn}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_pembelian_return_excelcom/:id"
              component={PrintPembelianReturnExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_pembelian_return_excelcom/:id"
              component={DetailPembelianReturnExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/pembelian_barang_return_excelcom"
              component={PembelianBarangReturn}
              isAuthenticated={true}
            />
            {/* END RETURN EXCELCOM */}

            {/* RETURN DINARPOS */}
            <PrivateRoute
              path="/penjualan_return_dinarpos"
              component={PenjualanReturnDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_penjualan_return_dinarpos/:id"
              component={PrintPenjualanReturnDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_penjualan_return_dinarpos/:id"
              component={DetailPenjualanReturnDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/penjualan_barang_return_dinarpos"
              component={PenjualanBarangReturnDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/pembelian_return_dinarpos"
              component={PembelianReturnDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_pembelian_return_dinarpos/:id"
              component={PrintPembelianReturnDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_pembelian_return_dinarpos/:id"
              component={DetailPembelianReturnDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/pembelian_barang_return_dinarpos"
              component={PembelianBarangReturnDinar}
              isAuthenticated={true}
            />
            {/* END RETURN DINARPOS */}

            {/* NOTIFIKASI EXCELCOM */}
            <PrivateRoute
              path="/print_histori_excelcom/:id"
              component={PrintHistoriExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_7_excelcom"
              component={Notifikasi7Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_7_excelcom/:id"
              component={Konfirmasi7Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_30_excelcom"
              component={Notifikasi30Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_30_excelcom/:id"
              component={Konfirmasi30Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_90_excelcom"
              component={Notifikasi90Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_90_excelcom/:id"
              component={Konfirmasi90Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_120_excelcom"
              component={Notifikasi120Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_120_excelcom/:id"
              component={Konfirmasi120Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_365_excelcom"
              component={Notifikasi365Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_365_excelcom/:id"
              component={Konfirmasi365Excelcom}
              isAuthenticated={true}
            />
            {/* END NOTIFIKASI EXCELCOM */}

            {/* NOTIFIKASI DINARPOS */}
            <PrivateRoute
              path="/print_histori_dinarpos/:id"
              component={PrintHistoriDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_7_dinarpos"
              component={Notifikasi7Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_7_dinarpos/:id"
              component={Konfirmasi7Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_30_dinarpos"
              component={Notifikasi30Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_30_dinarpos/:id"
              component={Konfirmasi30Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_90_dinarpos"
              component={Notifikasi90Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_90_dinarpos/:id"
              component={Konfirmasi90Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_120_dinarpos"
              component={Notifikasi120Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_120_dinarpos/:id"
              component={Konfirmasi120Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_365_dinarpos"
              component={Notifikasi365Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/konfirmasi_365_dinarpos/:id"
              component={Konfirmasi365Dinarpos}
              isAuthenticated={true}
            />
            {/* END NOTIFIKASI DINARPOS */}

            {/* LAPORAN DINARPOS */}
            <PrivateRoute
              path="/laporan_barang_dinarpos"
              component={LaporanBarangDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_barang_dinarpos"
              component={TanggalFilterBarangDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_suplier_dinarpos"
              component={LaporanSuplierDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_suplier_dinarpos"
              component={TanggalFilterSuplierDinarpos}
              isAuthenticated={true}
            />
            {/* LAPORAN SALESMAN */}
            <PrivateRoute
              path="/laporan_salesman_dinarpos"
              component={LaporanSalesmanDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_salesman_dinarpos/:id"
              component={DetailHistoriSalesmanDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_laporan_salesman_dinarpos/:id"
              component={PrintHistoriTransaksiDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_salesman_dinarpos"
              component={TglFilterSalesmanDinarpos}
              isAuthenticated={true}
            />
            {/* END LAPORAN SALESMAN */}
            <PrivateRoute
              path="/laporan_customer_dinarpos"
              component={LaporanCustomerDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_customer_dinarpos"
              component={TanggalFilterCustomerDinarpos}
              isAuthenticated={true}
            />
            {/* LAPORAN TRANSAKSI BELI */}
            <PrivateRoute
              path="/laporan_transaksi_beli_dinarpos"
              component={LaporanTransaksiBeliDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_transaksi_beli_dinarpos/:id"
              component={DetailHistoriTransaksiBeliDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_laporan_transaksi_beli_dinarpos/:id"
              component={PrintHistoriTransaksiBeliDinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_transaksi_beli_dinarpos"
              component={TglFilterTransaksiBeliDinarpos}
              isAuthenticated={true}
            />
            {/* END LAPORAN TRANSAKSI BELI */}
            {/* END LAPORAN DINARPOS */}

            {/* LAPORAN EXCELCOM */}
            <PrivateRoute
              path="/laporan_barang_excelcom"
              component={LaporanBarangExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_barang_excelcom"
              component={TanggalFilterBarangExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_suplier_excelcom"
              component={LaporanSuplierExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_suplier_excelcom"
              component={TanggalFilterSuplierExcelcom}
              isAuthenticated={true}
            />
            {/* LAPORAN SALESMAN */}
            <PrivateRoute
              path="/laporan_salesman_excelcom"
              component={LaporanSalesmanExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_salesman_excelcom"
              component={TanggalFilterSalesmanExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_salesman_excelcom/:id"
              component={DetailHistoriSalesmanExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_laporan_salesman_excelcom/:id"
              component={PrintHistoriTransaksiExcelcom}
              isAuthenticated={true}
            />
            {/* END LAPORAN SALESMAN */}
            <PrivateRoute
              path="/laporan_customer_excelcom"
              component={LaporanCustomerExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_customer_excelcom"
              component={TanggalFilterCustomerExcelcom}
              isAuthenticated={true}
            />
            {/* LAPORAN TRANSAKSI BELI */}
            <PrivateRoute
              path="/laporan_transaksi_beli_excelcom"
              component={LaporanTransaksiBeliExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_histori_transaksi_beli_excelcom/:id"
              component={DetailHistoriTransaksiBeliExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_histori_laporan_transaksi_beli_excelcom/:id"
              component={PrintHistoriTransaksiBeliExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/tanggalfilter_transaksi_beli_excelcom"
              component={TglFilterTransaksiBeliExcelcom}
              isAuthenticated={true}
            />
            {/* END LAPORAN TRANSAKSI BELI */}
            {/* END LAPORAN EXCELCOM */}

            {/* TRANSAKSI INDENT EXCELCOM */}
            <PrivateRoute
              path="/transaksi_indent_excelcom"
              component={TransaksiIndentExcelcom}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/add_transaksi_indent_excelcom"
              component={AddIndentExcelcom}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/cetak_struk_transaksi_indent_excelcom/:id"
              component={CetakIndentExcelcom}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/add_transaksi_from_indent_excelcom/:id"
              component={AddTransaksiFromIndentExcelcom}
              isAuthenticated={true}
            />
            {/* END TRANSAKSI INDENT EXCELCOM */}

            {/* TRANSAKSI INDENT DINARPOS */}
            <PrivateRoute
              path="/transaksi_indent_dinarpos"
              component={TransaksiIndentDinarpos}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/add_transaksi_indent_dinarpos"
              component={AddIndentDinarpos}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/cetak_struk_transaksi_indent_dinarpos/:id"
              component={CetakIndentDinarpos}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/add_transaksi_from_indent_dinarpos/:id"
              component={AddTransaksiFromIndentDinarpos}
              isAuthenticated={true}
            />
            {/* END TRANSAKSI INDENT DINARPOS */}

            {/* ACCOUNTING */}
            <PrivateRoute
              path="/kas_harian"
              component={KasHarian}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_saldo"
              component={AddSaldo}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_saldo/:id"
              component={EditSaldo}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/data_hutang"
              component={Hutang}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/data_piutang"
              component={Piutang}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/pelunasan_piutang/:id"
              component={PelunasanPiutang}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/pelunasan_hutang/:id"
              component={PelunasanHutang}
              isAuthenticated={true}
            />
            {/* END ACCOUNTING */}

            {/* TEKNISI */}
            <PrivateRoute
              path="/data_teknisi"
              component={DataTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_teknisi"
              component={AddTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_teknisi/:id"
              component={EditTeknisi}
              isAuthenticated={true}
            />
            {/* END TEKNISI */}

            {/* SERVICE */}
            <PrivateRoute
              path="/data_service"
              component={DataService}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/data_service_taken"
              component={DataServiceTaken}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_service/:id"
              component={DetailService}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_service_taken/:id"
              component={DetailServiceTaken}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_service_teknisi/:id"
              component={DetailServiceTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_service"
              component={AddService}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_service/:id"
              component={PrintService}
              isAuthenticated={true}
            />
            {/* END SERVICE */}

            {/* RETUR SERVICE */}
            <PrivateRoute
              path="/data_retur"
              component={DataRetur}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/entri_retur"
              component={EntriRetur}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/add_retur/:id"
              component={AddRetur}
              isAuthenticated={true}
            />
            {/* END RETUR SERVICE */}

            {/* TAKE OVER */}
            <PrivateRoute
              path="/take_over"
              component={TakeOver}
              isAuthenticated={true}
            />
            {/* END TAKE OVER */}

            {/* POIN */}
            <PrivateRoute
              path="/data_poin_teknisi"
              component={DataPoin}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/poin_teknisi"
              component={PointTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_point"
              component={AddPoint}
              isAuthenticated={true}
            />
            {/* END POIN */}

            {/* FINISH */}
            <PrivateRoute
              path="/finish"
              component={DataFinish}
              isAuthenticated={true}
            />
            {/* END FINISH */}

            {/* GARANSI */}
            <PrivateRoute
              path="/garansi"
              component={Garansi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_garansi"
              component={AddGaransi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_garansi/:id"
              component={EditGaransi}
              isAuthenticated={true}
            />
            {/* END GARANSI */}

            {/* BON BARANG */}
            <PrivateRoute
              path="/bon_barang"
              component={DataBon}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_bon_barang"
              component={AddBonBarang}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_bon_barang/:id"
              component={EditBonBarang}
              isAuthenticated={true}
            />
            {/* END BON BARANG */}

            {/* EDIT DATA */}
            <PrivateRoute
              path="/edit_data"
              component={EditData}
              isAuthenticated={true}
            />
            {/* END EDIT DATA */}

            {/* ROLE TEKNISI */}
            <PrivateRoute
              path="/dashboard_teknisi"
              component={DashboardTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/service_cancel_teknisi"
              component={ServiceCancelTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/service_teknisi"
              component={ServiceTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/service_retur_teknisi"
              component={ServiceReturTeknisi}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/history_point"
              component={HistoryPoint}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/grafik_poin/:id"
              component={GrafikPoin}
              isAuthenticated={true}
            />
            {/* ROLE TEKNISI */}

            {/* ROLE PIMPINAN */}
            <PrivateRoute
              path="/dashboard_pimpinan"
              component={DashboardPimpinan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_service_pimpinan/:id"
              component={DetailServicePimpinan}
              isAuthenticated={true}
            />
            {/* END ROLE PIMPINAN */}

            <PrivateRoute
              path="/dashboard_service"
              component={DashboardAdminService}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/laporan_marketting"
              component={LaporanMarketting}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_pendapatan"
              component={LaporanPendapatan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_status"
              component={LaporanStatusService}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_service"
              component={LaporanService}
              isAuthenticated={true}
            />

            <PrivateRoute
              path="/detail_customer/:id"
              component={DetailCustomer}
              isAuthenticated={true}
            />

            {/* ITC */}
            <PrivateRoute
              path="/data_itc"
              component={DataItc}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/add_itc"
              component={AddItc}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/edit_itc/:id"
              component={EditItc}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/home"
              component={Home}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/dealpo"
              component={DealPo}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/kunjungan"
              component={Kunjungan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_kunjungan"
              component={DetailKunjungan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_kunjungan_hari"
              component={DetailKunjunganHari}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/planning_marketting"
              component={DataPlanning}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_planning/:tgl"
              component={DetailPlanning}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/input_planning"
              component={InputPlanning}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/input_kunjungan"
              component={InputKunjungan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_admin_itc"
              component={LapAdminItc}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/by_month_kunjungan"
              component={ByMonthKunjungan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/print_kunjungan?tgl_awal=:tglawal&tgl_akhir=:tglakhir"
              component={PrintKunjungan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/daily_report"
              component={DailyRepost}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/export_laporan"
              component={ExportLaporan}
              isAuthenticated={true}
            />

            {/* LAPORAN ITC */}
            <PrivateRoute
              path="/laporan_sync"
              component={LapSync}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/detail_sync/:id"
              component={DetailSync}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_disiplin"
              component={LapDisiplin}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_kunjungan"
              component={LapKunjungan}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/preparation"
              component={Preparation}
              isAuthenticated={true}
            />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
