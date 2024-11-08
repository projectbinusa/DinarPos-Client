import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import brand from "../assets/brand.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Decrypt from "./Decrypt";
import axios from "axios";
import { API_PENGGUNA } from "../utils/BaseUrl";

function SidebarAdmin() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const history = useHistory();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const logout = () => {
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    localStorage.clear();
  };

  const [level, setlevel] = useState("");
  const [roleToko, setroleToko] = useState("");

  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setlevel(response.levelPengguna);
        setroleToko(response.roleToko);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <div>
        <div className="w-full bg-white drop-shadow-lg flex gap-3 p-2 lg:hidden fixed z-10">
          <IconButton variant="text" size="lg" onClick={openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <div className="flex items-center gap-1">
            <img src={brand} alt="brand" className="h-8 w-12" />
            <Typography variant="h5" color="blue-gray" className="font-poppins">
              EXCELLENT
            </Typography>
          </div>
        </div>
        <Drawer
          open={isDrawerOpen}
          onClose={closeDrawer}
          overlayProps={{
            className: "fixed inset-0 bg-black opacity-50",
          }}
        >
          <Card
            color="white"
            shadow={false}
            className="h-screen w-full p-2 bg-blend-overlay"
          >
            <div className="mb-2 flex items-center gap-4 p-2">
              <img src={brand} alt="brand" className="h-8 w-12" />
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-poppins"
              >
                EXCELLENT
              </Typography>
            </div>
            <List className="pb-12">
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ||
                level === "Gudang" ||
                level === "Accounting" ? (
                <>
                  <a href="/dashboard">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      dashboard
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              {/* TRANSAKSI INDENT */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ? (
                <>
                  <Accordion
                    open={open === 11}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-3 w-3 transition-transform ${open === 11 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded" selected={open === 11}>
                      <AccordionHeader
                        onClick={() => handleOpen(11)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal"
                        >
                          TRANSAKSI INDENT
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        {roleToko === "Superadmin" ||
                          roleToko === "Admin" ||
                          roleToko === "excelcom" ? (
                          <>
                            <a href="/transaksi_indent_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                EXCELCOM
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                        {roleToko === "Superadmin" ||
                          roleToko === "Admin" ||
                          roleToko === "dinarpos" ? (
                          <>
                            <a href="/transaksi_indent_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                DINARPOS
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* TRANSAKSI PENJUALAN */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Gudang" ||
                level === "Kasir" ? (
                <>
                  <Accordion
                    open={open === 1}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-3 w-3 transition-transform ${open === 1 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded" selected={open === 1}>
                      <AccordionHeader
                        onClick={() => handleOpen(1)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal"
                        >
                          TRANSAKSI PENJUALAN
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        {roleToko === "Superadmin" ||
                          roleToko === "Admin" ||
                          roleToko === "excelcom" ? (
                          <>
                            <a href="/transaksi_penjualan_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                EXCELCOM
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                        {roleToko === "Superadmin" ||
                          roleToko === "Admin" ||
                          roleToko === "dinarpos" ? (
                          <>
                            <a href="/transaksi_penjualan_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                DINARPOS
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* TRANSAKSI PEMBELIAN */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Gudang" ? (
                <>
                  <Accordion
                    open={open === 2}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-3 w-3 transition-transform ${open === 2 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded" selected={open === 2}>
                      <AccordionHeader
                        onClick={() => handleOpen(2)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal "
                        >
                          TRANSAKSI pembelian
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        {roleToko === "Superadmin" ||
                          roleToko === "Admin" ||
                          roleToko === "excelcom" ? (
                          <>
                            <a href="/transaksi_pembelian_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                EXCELCOM
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                        {roleToko === "Superadmin" ||
                          roleToko === "Admin" ||
                          roleToko === "dinarpos" ? (
                          <>
                            <a href="/transaksi_pembelian_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                DINARPOS
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* DATA USER */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ||
                level === "Gudang" ? (
                <>
                  <Accordion
                    open={open === 3}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-3 w-3 transition-transform ${open === 3 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded" selected={open === 3}>
                      <AccordionHeader
                        onClick={() => handleOpen(3)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal"
                        >
                          data user
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        {level === "Superadmin" ||
                          level === "Admin" ||
                          level === "Kasir" ? (
                          <>
                            <a href="/data_customer">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                data customer
                              </ListItem>
                            </a>
                            <a href="/data_customer_cp">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                data customer cp
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                        {level === "Superadmin" ||
                          level === "Admin" ||
                          level === "Gudang" ? (
                          <>
                            <a href="/data_suplier">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                data suplier
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                        {level === "Superadmin" || level === "Admin" ? (
                          <>
                            <a href="/data_salesman">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                data salesman
                              </ListItem>
                            </a>
                            <a href="/data_pengguna">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                data pengguna
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* DATA BARANG */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ||
                level === "Gudang" ? (
                <>
                  <Accordion
                    open={open === 4}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-3 w-3 transition-transform ${open === 4 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded" selected={open === 4}>
                      <AccordionHeader
                        onClick={() => handleOpen(4)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal"
                        >
                          data barang
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        {level === "Superadmin" ||
                          level === "Admin" ||
                          level === "Gudang" ||
                          level === "Kasir" ? (
                          <>
                            <a href="/data_barang">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                data barang
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                        {level === "Superadmin" ||
                          level === "Admin" ||
                          level === "Gudang" ? (
                          <>
                            <a href="/stok_masuk_barang">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                stok masuk
                              </ListItem>
                            </a>
                            <a href="/stok_keluar_barang">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                stok opname
                              </ListItem>
                            </a>
                          </>
                        ) : (
                          <></>
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* ACCOUNTING */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Accounting" ? (
                <>
                  <Accordion
                    open={open === 12}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-3 w-3 transition-transform ${open === 12 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded" selected={open === 12}>
                      <AccordionHeader
                        onClick={() => handleOpen(12)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal"
                        >
                          accounting
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        <a href="/kas_harian">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            kas harian
                          </ListItem>
                        </a>
                        <a href="/data_hutang">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            hutang
                          </ListItem>
                        </a>
                        <a href="/data_piutang">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            piutang
                          </ListItem>
                        </a>
                        <a href="/laporan_marketting">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            laporan marketting
                          </ListItem>
                        </a>
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* RETURN EXCELCOM */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Accounting" ? (
                <>
                  {roleToko === "Superadmin" ||
                    roleToko === "Admin" ||
                    roleToko === "excelcom" ? (
                    <>
                      <Accordion
                        open={open === 5}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-3 w-3 transition-transform ${open === 5 ? "rotate-180" : ""
                              }`}
                          />
                        }
                      >
                        <ListItem className="p-0 rounded" selected={open === 5}>
                          <AccordionHeader
                            onClick={() => handleOpen(5)}
                            className="border-b-0 px-3 py-2 "
                          >
                            <Typography
                              color="blue-gray"
                              className="font-poppins uppercase mr-auto text-sm font-normal"
                            >
                              return excelcom
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-2">
                          <List className="p-0">
                            <a href="/penjualan_return_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                penjualan return
                              </ListItem>
                            </a>
                            <a href="/penjualan_barang_return_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                penjualan barang return
                              </ListItem>
                            </a>
                            <a href="/pembelian_return_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                pembelian return
                              </ListItem>
                            </a>
                            <a href="/pembelian_barang_return_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                pembelian barang return
                              </ListItem>
                            </a>
                          </List>
                        </AccordionBody>
                      </Accordion>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {/* RETURN DINARPOS */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Accounting" ? (
                <>
                  {roleToko === "Superadmin" ||
                    roleToko === "Admin" ||
                    roleToko === "dinarpos" ? (
                    <>
                      <Accordion
                        open={open === 6}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-3 w-3 transition-transform ${open === 6 ? "rotate-180" : ""
                              }`}
                          />
                        }
                      >
                        <ListItem className="p-0 rounded" selected={open === 6}>
                          <AccordionHeader
                            onClick={() => handleOpen(6)}
                            className="border-b-0 px-3 py-2 "
                          >
                            <Typography
                              color="blue-gray"
                              className="font-poppins uppercase mr-auto text-sm font-normal"
                            >
                              return dinarpos
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-2">
                          <List className="p-0">
                            <a href="/penjualan_return_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                penjualan return
                              </ListItem>
                            </a>
                            <a href="/penjualan_barang_return_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                penjualan barang return
                              </ListItem>
                            </a>
                            <a href="/pembelian_return_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                pembelian return
                              </ListItem>
                            </a>
                            <a href="/pembelian_barang_return_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                pembelian barang return
                              </ListItem>
                            </a>
                          </List>
                        </AccordionBody>
                      </Accordion>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {/* LAPORAN EXCELCOM */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ||
                level === "Gudang" ||
                level === "Accounting" ? (
                <>
                  {roleToko === "excelcom" ||
                    roleToko === "Superadmin" ||
                    roleToko === "Admin" ? (
                    <>
                      <Accordion
                        open={open === 7}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-3 w-3 transition-transform ${open === 7 ? "rotate-180" : ""
                              }`}
                          />
                        }
                      >
                        <ListItem className="p-0 rounded" selected={open === 7}>
                          <AccordionHeader
                            onClick={() => handleOpen(7)}
                            className="border-b-0 px-3 py-2 "
                          >
                            <Typography
                              color="blue-gray"
                              className="font-poppins uppercase mr-auto text-sm font-normal"
                            >
                              laporan excelcom
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-2">
                          <List className="p-0">
                            <a href="/laporan_salesman_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                laporan salesman
                              </ListItem>
                            </a>
                            {level === "Gudang" ||
                              level === "Superadmin" ||
                              level === "Admin" ||
                              level === "Accounting" ? (
                              <>
                                <a href="/laporan_barang_excelcom">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan barang
                                  </ListItem>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                            {level === "Superadmin" ||
                              level === "Admin" ||
                              level === "Accounting" ? (
                              <>
                                <a href="/laporan_suplier_excelcom">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan suplier
                                  </ListItem>
                                </a>
                                <a href="/laporan_customer_excelcom">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan customer
                                  </ListItem>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                            {level === "Gudang" ||
                              level === "Superadmin" ||
                              level === "Admin" ||
                              level === "Accounting" ? (
                              <>
                                <a href="/laporan_transaksi_beli_excelcom">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan transaksi beli
                                  </ListItem>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                          </List>
                        </AccordionBody>
                      </Accordion>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {/* LAPORAN DINARPOS */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ||
                level === "Gudang" ||
                level === "Accounting" ? (
                <>
                  {roleToko === "dinarpos" ||
                    roleToko === "Superadmin" ||
                    roleToko === "Admin" ? (
                    <>
                      <Accordion
                        open={open === 8}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-3 w-3 transition-transform ${open === 8 ? "rotate-180" : ""
                              }`}
                          />
                        }
                      >
                        <ListItem className="p-0 rounded" selected={open === 8}>
                          <AccordionHeader
                            onClick={() => handleOpen(8)}
                            className="border-b-0 px-3 py-2 "
                          >
                            <Typography
                              color="blue-gray"
                              className="font-poppins uppercase mr-auto text-sm font-normal"
                            >
                              laporan dinarpos
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-2">
                          <List className="p-0">
                            <a href="/laporan_salesman_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                laporan salesman
                              </ListItem>
                            </a>
                            {level === "Superadmin" ||
                              level === "Admin" ||
                              level === "Gudang" ||
                              level === "Accounting" ? (
                              <>
                                <a href="/laporan_barang_dinarpos">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan barang
                                  </ListItem>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                            {level === "Superadmin" ||
                              level === "Admin" ||
                              level === "Accounting" ? (
                              <>
                                <a href="/laporan_suplier_dinarpos">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan suplier
                                  </ListItem>
                                </a>
                                <a href="/laporan_customer_dinarpos">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan customer
                                  </ListItem>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                            {level === "Superadmin" ||
                              level === "Admin" ||
                              level === "Gudang" ||
                              level === "Accounting" ? (
                              <>
                                <a href="/laporan_transaksi_beli_dinarpos">
                                  <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                    <ListItemPrefix>
                                      <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-3"
                                      />
                                    </ListItemPrefix>
                                    laporan transaksi beli
                                  </ListItem>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                          </List>
                        </AccordionBody>
                      </Accordion>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {/* NOTIFIKASI EXCELCOM */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ? (
                <>
                  {roleToko === "excelcom" ||
                    roleToko === "Superadmin" ||
                    roleToko === "Admin" ? (
                    <>
                      <Accordion
                        open={open === 9}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-3 w-3 transition-transform ${open === 9 ? "rotate-180" : ""
                              }`}
                          />
                        }
                      >
                        <ListItem className="p-0 rounded" selected={open === 9}>
                          <AccordionHeader
                            onClick={() => handleOpen(9)}
                            className="border-b-0 px-3 py-2 "
                          >
                            <Typography
                              color="blue-gray"
                              className="font-poppins uppercase mr-auto text-sm font-normal"
                            >
                              notifikasi excelcom
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-2">
                          <List className="p-0">
                            <a href="/notifikasi_7_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 7
                              </ListItem>
                            </a>
                            <a href="/notifikasi_30_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 30
                              </ListItem>
                            </a>
                            <a href="/notifikasi_90_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 90
                              </ListItem>
                            </a>
                            <a href="/notifikasi_120_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 120
                              </ListItem>
                            </a>
                            <a href="/notifikasi_365_excelcom">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 365
                              </ListItem>
                            </a>
                          </List>
                        </AccordionBody>
                      </Accordion>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {/* NOTIFIKASI DINARPOS */}
              {level === "Superadmin" ||
                level === "Admin" ||
                level === "Kasir" ? (
                <>
                  {roleToko === "dinarpos" ||
                    roleToko === "Superadmin" ||
                    roleToko === "Admin" ? (
                    <>
                      <Accordion
                        open={open === 10}
                        icon={
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto  h-3 w-3 transition-transform ${open === 10 ? "rotate-180" : ""
                              }`}
                          />
                        }
                      >
                        <ListItem
                          className="p-0 rounded "
                          selected={open === 10}
                        >
                          <AccordionHeader
                            onClick={() => handleOpen(10)}
                            className="border-b-0 px-3 py-2 "
                          >
                            <Typography
                              color="blue-gray"
                              className="font-poppins uppercase mr-auto text-sm font-normal"
                            >
                              notifikasi dinarpos
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-2">
                          <List className="p-0">
                            <a href="/notifikasi_7_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 7
                              </ListItem>
                            </a>
                            <a href="/notifikasi_30_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 30
                              </ListItem>
                            </a>
                            <a href="/notifikasi_90_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 90
                              </ListItem>
                            </a>
                            <a href="/notifikasi_120_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 120
                              </ListItem>
                            </a>
                            <a href="/notifikasi_365_dinarpos">
                              <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-3"
                                  />
                                </ListItemPrefix>
                                notifikasi 365
                              </ListItem>
                            </a>
                          </List>
                        </AccordionBody>
                      </Accordion>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {/* ADMIN SERVICE */}
              {level === "AdminService" ? (
                <>
                  <a href="/dashboard_service">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Dashboard
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}
              {level === "Superadmin" || level === "AdminService" ? (
                <>
                  <a href="/data_service">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      data service
                    </ListItem>
                  </a>
                  <a href="/data_retur">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      data retur
                    </ListItem>
                  </a>
                  <a href="/data_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      teknisi
                    </ListItem>
                  </a>
                  <a href="/take_over">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      take over
                    </ListItem>
                  </a>
                  <a href="/data_poin_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      poin
                    </ListItem>
                  </a>
                  <a href="/finish">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      finish
                    </ListItem>
                  </a>
                  <a href="/garansi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      garansi
                    </ListItem>
                  </a>
                  <a href="/bon_barang">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      bon barang
                    </ListItem>
                  </a>
                  <a href="/edit_data">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      edit data
                    </ListItem>
                  </a>
                  <Accordion
                    open={open === 11}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto  h-3 w-3 transition-transform ${open === 11 ? "rotate-180" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0 rounded " selected={open === 11}>
                      <AccordionHeader
                        onClick={() => handleOpen(11)}
                        className="border-b-0 px-3 py-2 "
                      >
                        <Typography
                          color="blue-gray"
                          className="font-poppins uppercase mr-auto text-sm font-normal"
                        >
                          LAPORAN SERVICE
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-2">
                      <List className="p-0">
                        <a href="/laporan_service">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            LAPORAN SERVICE
                          </ListItem>
                        </a>
                        <a href="/laporan_pendapatan">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            laporan pendapatan
                          </ListItem>
                        </a>
                        <a href="/laporan_status">
                          <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                            <ListItemPrefix>
                              <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-3"
                              />
                            </ListItemPrefix>
                            laporan status
                          </ListItem>
                        </a>
                      </List>
                    </AccordionBody>
                  </Accordion>
                </>
              ) : (
                <></>
              )}

              {/* PIMPINAN */}
              {level === "Pimpinan" ? (
                <>
                  <a href="/dashboard_pimpinan">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      dashboard
                    </ListItem>
                  </a>
                  <a href="/data_service_taken">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      TAKEN
                    </ListItem>
                  </a>
                  <a href="/poin_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      poin teknisi
                    </ListItem>
                  </a>
                  <a href="/finish">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      finish
                    </ListItem>
                  </a>
                  <a href="/data_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      teknisi
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              {/* TEKNISI */}
              {level === "Teknisi" ? (
                <>
                  <a href="/dashboard_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      dashboard
                    </ListItem>
                  </a>
                  <a href="/data_service_taken">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Taken
                    </ListItem>
                  </a>
                  <a href="/service_cancel_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Cancel
                    </ListItem>
                  </a>
                  <a href="/service_teknisi">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      My Service
                    </ListItem>
                  </a>
                  <a href="/history_point">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Poin
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              {/* ADMIN ITC */}
              {level === "AdminItc" ? (
                <>
                  <a href="/home">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      dashboard
                    </ListItem>
                  </a>
                  <a href="/data_itc">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      ITC
                    </ListItem>
                  </a>
                  <a href="/kunjungan">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Kunjungan
                    </ListItem>
                  </a>
                  <a href="/planning">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Planning
                    </ListItem>
                  </a>
                  <a href="/dealpo">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Deal PO
                    </ListItem>
                  </a>
                  <a href="/dealfinish">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Deal Finish
                    </ListItem>
                  </a>
                  <a href="/laporan_admin_itc">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              {/* MARKETTING */}
              {level === "Marketting" ? (
                <>
                  <a href="/home">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      dashboard
                    </ListItem>
                  </a>
                  <a href="/customer">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Customer
                    </ListItem>
                  </a>
                  <a href="/planning_marketting">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Planning
                    </ListItem>
                  </a>
                  <a href="/daily_report">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Daily Report
                    </ListItem>
                  </a>
                  <a href="/dealpo_marketting">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Deal PO
                    </ListItem>
                  </a>
                  <a href="/dealfinish_marketting">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Deal Finish
                    </ListItem>
                  </a>
                  <a href="/ijin_marketting">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Ijin
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              {/* PIMPINAN ITC */}
              {level === "PimpinanItc" ? (
                <>
                  <a href="/home">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      dashboard
                    </ListItem>
                  </a>
                  <a href="/data_itc">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      ITC
                    </ListItem>
                  </a>
                  <a href="/data_customer">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Customer
                    </ListItem>
                  </a>
                  <a href="/planning">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Planning
                    </ListItem>
                  </a>
                  <a href="/laporan_kunjungan">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Report
                    </ListItem>
                  </a>
                  <a href="/dealpo">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Deal PO
                    </ListItem>
                  </a>
                  <a href="/dealfinish">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Deal Finish
                    </ListItem>
                  </a>
                  <a href="/ijin">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Ijin
                    </ListItem>
                  </a>
                  <a href="/laporan_sync">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Sync
                    </ListItem>
                  </a>
                  <a href="/laporan_disiplin">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Disiplin
                    </ListItem>
                  </a>
                  <a href="/preparation">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Laporan Preparation
                    </ListItem>
                  </a>
                  <a href="/export_laporan">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Export Laporan
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              {/* KEUANGAN ITC */}
              {level === "Keuangan" ? (
                <>
                  <a href="/home">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Dashboard
                    </ListItem>
                  </a>
                  <a href="/omzet">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Omzet
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}


              {/* GUDANG ITC */}
              {level === "GudangItc" ? (
                <>
                  <a href="/home">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Dashboard
                    </ListItem>
                  </a>
                  <a href="/dealpo">
                    <ListItem className="px-3 py-2 text-sm rounded uppercase">
                      Deal PO
                    </ListItem>
                  </a>
                </>
              ) : (
                <></>
              )}

              <a href="/ubah_password" className="mb-5">
                <ListItem className="px-3 py-2 text-sm rounded uppercase">
                  ubah password
                </ListItem>
              </a>
            </List>
            <div className="fixed bottom-0 bg-white w-[17rem] left-0 py-2 px-6">
              <button
                onClick={logout}
                className="uppercase text-sm font-poppins"
              >
                Logout
              </button>
            </div>
          </Card>
        </Drawer>

        {/* SIDEBAR */}
        <Card className="fixed z-15 lg:block hidden h-screen w-full max-w-[18rem] p-2 shadow-xl rounded-none overflow-y-auto sidebar ">
          <div className="mb-2 flex items-center gap-4 p-2">
            <img src={brand} alt="brand" className="h-8 w-12" />
            <Typography variant="h5" color="blue-gray" className="font-poppins">
              EXCELLENT
            </Typography>
          </div>
          <List className="mb-5">
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ||
              level === "Gudang" ||
              level === "Accounting" ? (
              <>
                <a href="/dashboard">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    dashboard
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {/* TRANSAKSI INDENT */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ? (
              <>
                <Accordion
                  open={open === 11}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 11 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 11}>
                    <AccordionHeader
                      onClick={() => handleOpen(11)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal"
                      >
                        TRANSAKSI INDENT
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      {roleToko === "Superadmin" ||
                        roleToko === "Admin" ||
                        roleToko === "excelcom" ? (
                        <>
                          <a href="/transaksi_indent_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              EXCELCOM
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {roleToko === "Superadmin" ||
                        roleToko === "Admin" ||
                        roleToko === "dinarpos" ? (
                        <>
                          <a href="/transaksi_indent_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              DINARPOS
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}

            {/* TRANSAKSI PENJUALAN */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ||
              level === "Gudang" ? (
              <>
                <Accordion
                  open={open === 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 1 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 1}>
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal"
                      >
                        TRANSAKSI PENJUALAN
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      {roleToko === "Superadmin" ||
                        roleToko === "Admin" ||
                        roleToko === "excelcom" ? (
                        <>
                          <a href="/transaksi_penjualan_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              EXCELCOM
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {roleToko === "Superadmin" ||
                        roleToko === "Admin" ||
                        roleToko === "dinarpos" ? (
                        <>
                          <a href="/transaksi_penjualan_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              DINARPOS
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}

            {/* TRANSAKSI PEMBELIAN */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Gudang" ? (
              <>
                <Accordion
                  open={open === 2}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 2 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 2}>
                    <AccordionHeader
                      onClick={() => handleOpen(2)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal "
                      >
                        TRANSAKSI pembelian
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      {roleToko === "Superadmin" ||
                        roleToko === "Admin" ||
                        roleToko === "excelcom" ? (
                        <>
                          <a href="/transaksi_pembelian_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              EXCELCOM
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {roleToko === "Superadmin" ||
                        roleToko === "Admin" ||
                        roleToko === "dinarpos" ? (
                        <>
                          <a href="/transaksi_pembelian_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              DINARPOS
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}

            {/* DATA USER */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Gudang" ||
              level === "Kasir" ? (
              <>
                <Accordion
                  open={open === 3}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 3 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 3}>
                    <AccordionHeader
                      onClick={() => handleOpen(3)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal"
                      >
                        data user
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      {level === "Superadmin" ||
                        level === "Admin" ||
                        level === "Kasir" ? (
                        <>
                          <a href="/data_customer">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              data customer
                            </ListItem>
                          </a>
                          <a href="/data_customer_cp">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              data customer cp
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {level === "Superadmin" ||
                        level === "Admin" ||
                        level === "Gudang" ? (
                        <>
                          <a href="/data_suplier">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              data suplier
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {level === "Superadmin" || level === "Admin" ? (
                        <>
                          <a href="/data_salesman">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              data salesman
                            </ListItem>
                          </a>
                          <a href="/data_pengguna">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              data pengguna
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}

            {/* DATA BARANG */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ||
              level === "Gudang" ? (
              <>
                <Accordion
                  open={open === 4}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 4 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 4}>
                    <AccordionHeader
                      onClick={() => handleOpen(4)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal"
                      >
                        data barang
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      {level === "Superadmin" ||
                        level === "Admin" ||
                        level === "Gudang" ||
                        level === "Kasir" ? (
                        <>
                          <a href="/data_barang">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              data barang
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {level === "Superadmin" ||
                        level === "Admin" ||
                        level === "Gudang" ? (
                        <>
                          <a href="/stok_masuk_barang">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              stok masuk
                            </ListItem>
                          </a>
                          <a href="/stok_keluar_barang">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              stok opname
                            </ListItem>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}

            {/* ACCOUNTING */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Accounting" ? (
              <>
                <Accordion
                  open={open === 12}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 12 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 12}>
                    <AccordionHeader
                      onClick={() => handleOpen(12)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal"
                      >
                        accounting
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      <a href="/kas_harian">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          kas harian
                        </ListItem>
                      </a>
                      <a href="/data_hutang">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          hutang
                        </ListItem>
                      </a>
                      <a href="/data_piutang">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          piutang
                        </ListItem>
                      </a>
                      <a href="/laporan_marketting">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          laporan marketting
                        </ListItem>
                      </a>
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}

            {/* RETURN EXCELCOM */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Accounting" ? (
              <>
                {roleToko === "Superadmin" ||
                  roleToko === "Admin" ||
                  roleToko === "excelcom" ? (
                  <>
                    <Accordion
                      open={open === 5}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 w-3 transition-transform ${open === 5 ? "rotate-180" : ""
                            }`}
                        />
                      }
                    >
                      <ListItem className="p-0 rounded" selected={open === 5}>
                        <AccordionHeader
                          onClick={() => handleOpen(5)}
                          className="border-b-0 px-3 py-2 "
                        >
                          <Typography
                            color="blue-gray"
                            className="font-poppins uppercase mr-auto text-sm font-normal"
                          >
                            return excelcom
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-2">
                        <List className="p-0">
                          <a href="/penjualan_return_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              penjualan return
                            </ListItem>
                          </a>
                          <a href="/penjualan_barang_return_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              penjualan barang return
                            </ListItem>
                          </a>
                          <a href="/pembelian_return_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              pembelian return
                            </ListItem>
                          </a>
                          <a href="/pembelian_barang_return_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              pembelian barang return
                            </ListItem>
                          </a>
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* RETURN DINARPOS */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Accounting" ? (
              <>
                {roleToko === "Superadmin" ||
                  roleToko === "Admin" ||
                  roleToko === "dinarpos" ? (
                  <>
                    <Accordion
                      open={open === 6}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 w-3 transition-transform ${open === 6 ? "rotate-180" : ""
                            }`}
                        />
                      }
                    >
                      <ListItem className="p-0 rounded" selected={open === 6}>
                        <AccordionHeader
                          onClick={() => handleOpen(6)}
                          className="border-b-0 px-3 py-2 "
                        >
                          <Typography
                            color="blue-gray"
                            className="font-poppins uppercase mr-auto text-sm font-normal"
                          >
                            return dinarpos
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-2">
                        <List className="p-0">
                          <a href="/penjualan_return_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              penjualan return
                            </ListItem>
                          </a>
                          <a href="/penjualan_barang_return_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              penjualan barang return
                            </ListItem>
                          </a>
                          <a href="/pembelian_return_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              pembelian return
                            </ListItem>
                          </a>
                          <a href="/pembelian_barang_return_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              pembelian barang return
                            </ListItem>
                          </a>
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* LAPORAN EXCELCOM */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ||
              level === "Accounting" ||
              level === "Gudang" ? (
              <>
                {roleToko === "excelcom" ||
                  roleToko === "Superadmin" ||
                  roleToko === "Admin" ? (
                  <>
                    <Accordion
                      open={open === 7}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 w-3 transition-transform ${open === 7 ? "rotate-180" : ""
                            }`}
                        />
                      }
                    >
                      <ListItem className="p-0 rounded" selected={open === 7}>
                        <AccordionHeader
                          onClick={() => handleOpen(7)}
                          className="border-b-0 px-3 py-2 "
                        >
                          <Typography
                            color="blue-gray"
                            className="font-poppins uppercase mr-auto text-sm font-normal"
                          >
                            laporan excelcom
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-2">
                        <List className="p-0">
                          <a href="/laporan_salesman_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              laporan salesman
                            </ListItem>
                          </a>
                          {level === "Gudang" ||
                            level === "Superadmin" ||
                            level === "Admin" ||
                            level === "Accounting" ? (
                            <>
                              <a href="/laporan_barang_excelcom">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan barang
                                </ListItem>
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                          {level === "Superadmin" ||
                            level === "Admin" ||
                            level === "Accounting" ? (
                            <>
                              <a href="/laporan_suplier_excelcom">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan suplier
                                </ListItem>
                              </a>
                              <a href="/laporan_customer_excelcom">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan customer
                                </ListItem>
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                          {level === "Superadmin" ||
                            level === "Admin" ||
                            level === "Gudang" ||
                            level === "Accounting" ? (
                            <>
                              <a href="/laporan_transaksi_beli_excelcom">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan transaksi beli
                                </ListItem>
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* LAPORAN DINARPOS */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ||
              level === "Accounting" ||
              level === "Gudang" ? (
              <>
                {roleToko === "dinarpos" ||
                  roleToko === "Superadmin" ||
                  roleToko === "Admin" ? (
                  <>
                    <Accordion
                      open={open === 8}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 w-3 transition-transform ${open === 8 ? "rotate-180" : ""
                            }`}
                        />
                      }
                    >
                      <ListItem className="p-0 rounded" selected={open === 8}>
                        <AccordionHeader
                          onClick={() => handleOpen(8)}
                          className="border-b-0 px-3 py-2 "
                        >
                          <Typography
                            color="blue-gray"
                            className="font-poppins uppercase mr-auto text-sm font-normal"
                          >
                            laporan dinarpos
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-2">
                        <List className="p-0">
                          <a href="/laporan_salesman_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              laporan salesman
                            </ListItem>
                          </a>
                          {level === "Gudang" ||
                            level === "Superadmin" ||
                            level === "Admin" ||
                            level === "Accounting" ? (
                            <>
                              <a href="/laporan_barang_dinarpos">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan barang
                                </ListItem>
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                          {level === "Superadmin" ||
                            level === "Admin" ||
                            level === "Accounting" ? (
                            <>
                              <a href="/laporan_suplier_dinarpos">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan suplier
                                </ListItem>
                              </a>
                              <a href="/laporan_customer_dinarpos">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan customer
                                </ListItem>
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                          {level === "Gudang" ||
                            level === "Superadmin" ||
                            level === "Admin" ||
                            level === "Accounting" ? (
                            <>
                              <a href="/laporan_transaksi_beli_dinarpos">
                                <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                                  <ListItemPrefix>
                                    <ChevronRightIcon
                                      strokeWidth={3}
                                      className="h-3 w-3"
                                    />
                                  </ListItemPrefix>
                                  laporan transaksi beli
                                </ListItem>
                              </a>
                            </>
                          ) : (
                            <></>
                          )}
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* NOTIFIKASI EXCELCOM */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ? (
              <>
                {roleToko === "excelcom" ||
                  roleToko === "Superadmin" ||
                  roleToko === "Admin" ? (
                  <>
                    <Accordion
                      open={open === 9}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 w-3 transition-transform ${open === 9 ? "rotate-180" : ""
                            }`}
                        />
                      }
                    >
                      <ListItem className="p-0 rounded" selected={open === 9}>
                        <AccordionHeader
                          onClick={() => handleOpen(9)}
                          className="border-b-0 px-3 py-2 "
                        >
                          <Typography
                            color="blue-gray"
                            className="font-poppins uppercase mr-auto text-sm font-normal"
                          >
                            notifikasi excelcom
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-2">
                        <List className="p-0">
                          <a href="/notifikasi_7_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 7
                            </ListItem>
                          </a>
                          <a href="/notifikasi_30_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 30
                            </ListItem>
                          </a>
                          <a href="/notifikasi_90_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 90
                            </ListItem>
                          </a>
                          <a href="/notifikasi_120_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 120
                            </ListItem>
                          </a>
                          <a href="/notifikasi_365_excelcom">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 365
                            </ListItem>
                          </a>
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* NOTIFIKASI DINARPOS */}
            {level === "Superadmin" ||
              level === "Admin" ||
              level === "Kasir" ? (
              <>
                {roleToko === "dinarpos" ||
                  roleToko === "Superadmin" ||
                  roleToko === "Admin" ? (
                  <>
                    <Accordion
                      open={open === 10}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-3 w-3 transition-transform ${open === 10 ? "rotate-180" : ""
                            }`}
                        />
                      }
                    >
                      <ListItem className="p-0 rounded" selected={open === 10}>
                        <AccordionHeader
                          onClick={() => handleOpen(10)}
                          className="border-b-0 px-3 py-2 "
                        >
                          <Typography
                            color="blue-gray"
                            className="font-poppins uppercase mr-auto text-sm font-normal"
                          >
                            notifikasi dinarpos
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-2">
                        <List className="p-0">
                          <a href="/notifikasi_7_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 7
                            </ListItem>
                          </a>
                          <a href="/notifikasi_30_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 30
                            </ListItem>
                          </a>
                          <a href="/notifikasi_90_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 90
                            </ListItem>
                          </a>
                          <a href="/notifikasi_120_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 120
                            </ListItem>
                          </a>
                          <a href="/notifikasi_365_dinarpos">
                            <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                              <ListItemPrefix>
                                <ChevronRightIcon
                                  strokeWidth={3}
                                  className="h-3 w-3"
                                />
                              </ListItemPrefix>
                              notifikasi 365
                            </ListItem>
                          </a>
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* ADMIN SERVICE */}
            {level === "AdminService" ? (
              <>
                <a href="/dashboard_service">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Dashboard
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {level === "Superadmin" || level === "AdminService" ? (
              <>
                <a href="/data_service">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    data service
                  </ListItem>
                </a>
                <a href="/data_retur">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    data retur
                  </ListItem>
                </a>
                <a href="/data_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    teknisi
                  </ListItem>
                </a>
                <a href="/take_over">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    take over
                  </ListItem>
                </a>
                <a href="/data_poin_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    poin
                  </ListItem>
                </a>
                <a href="/finish">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    finish
                  </ListItem>
                </a>
                <a href="/garansi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Garansi
                  </ListItem>
                </a>
                <a href="/bon_barang">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Bon Barang
                  </ListItem>
                </a>
                <a href="/edit_data">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Edit Data
                  </ListItem>
                </a>
                <Accordion
                  open={open === 11}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-3 w-3 transition-transform ${open === 11 ? "rotate-180" : ""
                        }`}
                    />
                  }
                >
                  <ListItem className="p-0 rounded" selected={open === 11}>
                    <AccordionHeader
                      onClick={() => handleOpen(11)}
                      className="border-b-0 px-3 py-2 "
                    >
                      <Typography
                        color="blue-gray"
                        className="font-poppins uppercase mr-auto text-sm font-normal"
                      >
                        LAPORAN SERVICE
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-2">
                    <List className="p-0">
                      <a href="/laporan_service">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          laporan service
                        </ListItem>
                      </a>
                      <a href="/laporan_pendapatan">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          laporan pendapatan
                        </ListItem>
                      </a>
                      <a href="/laporan_status">
                        <ListItem className="uppercase rounded px-3 py-2 text-sm ">
                          <ListItemPrefix>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-3"
                            />
                          </ListItemPrefix>
                          laporan status
                        </ListItem>
                      </a>
                    </List>
                  </AccordionBody>
                </Accordion>
              </>
            ) : (
              <></>
            )}
            {level === "Pimpinan" ? (
              <>
                <a href="/dashboard_pimpinan">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    dashboard
                  </ListItem>
                </a>
                <a href="/data_service_taken">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    taken
                  </ListItem>
                </a>
                <a href="/poin_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    poin teknisi
                  </ListItem>
                </a>
                <a href="/finish">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    finish
                  </ListItem>
                </a>
                <a href="/data_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    teknisi
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}
            {level === "Teknisi" ? (
              <>
                <a href="/dashboard_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Dashboard
                  </ListItem>
                </a>
                <a href="/data_service_taken">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Taken
                  </ListItem>
                </a>
                <a href="/service_cancel_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Cancel
                  </ListItem>
                </a>
                <a href="/service_teknisi">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    My Service
                  </ListItem>
                </a>
                <a href="/history_point">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Poin
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {level === "AdminItc" ? (
              <>
                <a href="/home">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    dashboard
                  </ListItem>
                </a>
                <a href="/data_itc">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    ITC
                  </ListItem>
                </a>
                <a href="/kunjungan">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Kunjungan
                  </ListItem>
                </a>
                <a href="/planning">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Planning
                  </ListItem>
                </a>
                <a href="/dealpo">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Deal PO
                  </ListItem>
                </a>
                <a href="/dealfinish">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Deal Finish
                  </ListItem>
                </a>
                <a href="/laporan_admin_itc">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {/* PIMPINAN ITC */}
            {level === "PimpinanItc" ? (
              <>
                <a href="/home">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    dashboard
                  </ListItem>
                </a>
                <a href="/data_itc">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    ITC
                  </ListItem>
                </a>
                <a href="/data_customer">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Customer
                  </ListItem>
                </a>
                <a href="/planning">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Planning
                  </ListItem>
                </a>
                <a href="/laporan_kunjungan">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Report
                  </ListItem>
                </a>
                <a href="/dealpo">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Deal PO
                  </ListItem>
                </a>
                <a href="/dealfinish">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Deal Finish
                  </ListItem>
                </a>
                <a href="/ijin  ">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Ijin
                  </ListItem>
                </a>
                <a href="/laporan_sync">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Sync
                  </ListItem>
                </a>
                <a href="/laporan_disiplin">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Disiplin
                  </ListItem>
                </a>
                <a href="/preparation">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Laporan Preparation
                  </ListItem>
                </a>
                <a href="/export_laporan">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Export Laporan
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {/* MARKETTING ITC */}
            {level === "Marketting" ? (
              <>
                <a href="/home">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Dashboard
                  </ListItem>
                </a>
                <a href="/data_customer">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Customer
                  </ListItem>
                </a>
                <a href="/planning_marketting">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Planning
                  </ListItem>
                </a>
                <a href="/daily_report">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Daily Report
                  </ListItem>
                </a>
                <a href="/dealpo_marketting">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Deal PO
                  </ListItem>
                </a>
                <a href="/dealfinish_marketting">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Deal Finish
                  </ListItem>
                </a>
                <a href="/ijin_marketting">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Ijin
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {/* GUDANG ITC */}
            {level === "GudangItc" ? (
              <>
                <a href="/home">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Dashboard
                  </ListItem>
                </a>
                <a href="/dealpo">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Deal PO
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {/* KEUANGAN ITC */}
            {level === "Keuangan" ? (
              <>
                <a href="/home">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Dashboard
                  </ListItem>
                </a>
                <a href="/omzet">
                  <ListItem className="px-3 py-2 text-sm rounded uppercase">
                    Omzet
                  </ListItem>
                </a>
              </>
            ) : (
              <></>
            )}

            {/* <a href="/lap_kunjungan">
              <ListItem className="px-3 py-2 text-sm rounded uppercase">
                Lap Kunjungan
              </ListItem>
            </a>
            <a href="/by_month_kunjungan">
              <ListItem className="px-3 py-2 text-sm rounded uppercase">
                By Month Kunjungan
              </ListItem>
            </a> */}

            <a href="/ubah_password">
              <ListItem className="px-3 py-2 text-sm rounded uppercase">
                ubah password
              </ListItem>
            </a>
          </List>
          <div className="fixed bottom-0 bg-white w-[17rem] left-0 py-2 px-6">
            <button onClick={logout} className="uppercase text-sm font-poppins">
              Logout
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default SidebarAdmin;
