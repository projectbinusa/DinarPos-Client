import { Button, DialogBody, DialogFooter, DialogHeader, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { API_CUSTOMER } from "../../../../utils/BaseUrl";

function ModalEditPlanning({ handleOpen, terakhirUpdate, nama, jenis, kab, kec, pihak, ket, idCustomer, idPlan }) {
    // ALL CUSTOMER
    const [values, setvalues] = useState("");
    const [options, setoptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handle = async () => {
        if (values.trim() !== "") {
            const response = await fetch(
                `${API_CUSTOMER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            const data = await response.json();
            setoptions(data.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        handle();
    }, [currentPage, values]);

    const handleChange = (event) => {
        setvalues(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <DialogHeader>Edit Planning</DialogHeader>
            <form>
                <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex gap-2 items-end">
                        <Input
                            variant="static"
                            color="blue"
                            list="customer-list"
                            id="customer"
                            name="customer"
                            label="Customer"
                            onChange={(event) => {
                                handleChange(event);
                            }}
                            placeholder="Pilih Customer"
                        />
                        <datalist id="customer-list">
                            {options.length > 0 && (
                                <>
                                    {options.map((option) => (
                                        <option value={option.id} key={option.id}>{option.nama_customer}</option>
                                    ))}
                                </>
                            )}
                        </datalist>

                        <div className="flex gap-2">
                            <button
                                className="text-sm bg-gray-400 px-1"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-400 px-1"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={!options.length}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Terakhir Diupdate" value={terakhirUpdate} />
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Nama Customer" value={nama} />
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Jenis" value={jenis} />
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Daerah" value={`${kab} / ${kec}`} />
                    <Textarea
                        color="blue"
                        variant="static"
                        label="Tujuan"
                        placeholder="Masukkan Tujuan"
                        value={ket}
                        className="col-span-2"
                        // onChange={(e) => setket(e.target.value)}
                        required
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-1 font-poppins font-medium"
                    >
                        <span>Kembali</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={handleOpen}
                        type="submit"
                        className="font-poppins font-medium"
                    >
                        <span>Simpan</span>
                    </Button>
                </DialogFooter>
            </form>
        </div>
    )
}

export default ModalEditPlanning;