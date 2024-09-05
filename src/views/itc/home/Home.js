import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN, API_PLANNING } from "../../../utils/BaseUrl";

function Home() {
  const [planning, setPlanning] = useState([]);
  const [kunjungan, setKunjungan] = useState([]);

  // GET ALL PLANNING
  const allPlanning = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setPlanning(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET ALL KUNJUNGAN
  const allKunjungan = async () => {
    try {
      const response = await axios.get(`${API_KUNJUNGAN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setKunjungan(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allPlanning();
    allKunjungan();
  }, []);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[19rem] pt-20 lg:pt-5 w-full">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mr-4 mx-5 lg:mx-0">
          {/* Report Card */}
          <Card className="p-2 order-1 lg:order-2">
            <Typography variant="h4" color="blue-gray" className="font-poppins">
              Report
            </Typography>
            <br />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Last Update
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Persen</th>
                </tr>
              </thead>
              <tbody>
                {kunjungan.map((item, index) => (
                  <tr key={index}>
                    <td className="text-sm py-2 px-3">{item.namaITC}</td>
                    <td className="text-sm py-2 px-3">{item.lastUpdate}</td>
                    <td className="text-sm py-2 px-3">{item.omzet}</td>
                    <td className="text-sm py-2 px-3">{item.persen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-4 border-gray-300" />
          </Card>

          {/* Planning Card */}
          <Card className="p-2 order-1 lg:order-2">
            <Typography variant="h4" color="blue-gray" className="font-poppins">
              Planning
            </Typography>
            <br />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Last Update
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Persen</th>
                </tr>
              </thead>
              <tbody>
                {planning.map((item, index) => (
                  <tr key={index}>
                    <td className="text-sm py-2 px-3">{item.namaITC}</td>
                    <td className="text-sm py-2 px-3">{item.lastUpdate}</td>
                    <td className="text-sm py-2 px-3">{item.omzet}</td>
                    <td className="text-sm py-2 px-3">{item.persen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-4 border-gray-300" />
          </Card>
        </div>
        <br />
      </div>
    </section>
  );
}

export default Home;
