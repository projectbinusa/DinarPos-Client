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
import PenjualanBarangReturn from "./views/admin/return_excelcom/penjualan_barang/PenjualanBarangReturn";

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
            {/* ROLE ADMIN */}
            <PrivateRoute
              path="/dashboard_admin"
              component={Dashboard}
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
            {/* END DATA CUSTOMER */}

            <PrivateRoute
              path="/data_customer_cp"
              component={DataCustomerCP}
              isAuthenticated={true}
            />

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
            {/* END RETURN EXCELCOM */}
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
