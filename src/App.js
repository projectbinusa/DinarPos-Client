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
import PembelianReturnDinar from "./views/admin/return_dinar/pembelian/PembelianBarangReturn.js";
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
import DashboardKasir from "./views/kasir/DashboardKasir.js";
import CetakStrukExcelcom from "./views/admin/transaksi_pembeliaan/CetakStrukExcelcom.js";
import CetakStrukDinarpos from "./views/admin/transaksi_pembeliaan/CetakStrukDinarpos.js";

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
              path="/dashboard_admin"
              component={Dashboard}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/dashboard_kasir"
              component={DashboardKasir}
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
              path="/pembelian_barang_return_dinarpos"
              component={PembelianBarangReturnDinar}
              isAuthenticated={true}
            />
            {/* END RETURN EXCELCOM */}

            {/* NOTIFIKASI EXCELCOM */}
            <PrivateRoute
              path="/notifikasi_7_excelcom"
              component={Notifikasi7Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_30_excelcom"
              component={Notifikasi30Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_90_excelcom"
              component={Notifikasi90Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_120_excelcom"
              component={Notifikasi120Excelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_365_excelcom"
              component={Notifikasi365Excelcom}
              isAuthenticated={true}
            />
            {/* END NOTIFIKASI EXCELCOM */}

            {/* NOTIFIKASI DINARPOS */}
            <PrivateRoute
              path="/notifikasi_7_dinarpos"
              component={Notifikasi7Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_30_dinarpos"
              component={Notifikasi30Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_90_dinarpos"
              component={Notifikasi90Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_120_dinarpos"
              component={Notifikasi120Dinarpos}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/notifikasi_365_dinarpos"
              component={Notifikasi365Dinarpos}
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
              path="/laporan_suplier_dinarpos"
              component={LaporanSuplierDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_salesman_dinarpos"
              component={LaporanSalesmanDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_customer_dinarpos"
              component={LaporanCustomerDinar}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_transaksi_beli_dinarpos"
              component={LaporanTransaksiBeliDinar}
              isAuthenticated={true}
            />
            {/* END LAPORAN DINARPOS */}

            {/* LAPORAN EXCELCOM */}
            <PrivateRoute
              path="/laporan_barang_excelcom"
              component={LaporanBarangExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_suplier_excelcom"
              component={LaporanSuplierExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_salesman_excelcom"
              component={LaporanSalesmanExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_customer_excelcom"
              component={LaporanCustomerExcelcom}
              isAuthenticated={true}
            />
            <PrivateRoute
              path="/laporan_transaksi_beli_excelcom"
              component={LaporanTransaksiBeliExcelcom}
              isAuthenticated={true}
            />
            {/* END LAPORAN EXCELCOM */}
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
