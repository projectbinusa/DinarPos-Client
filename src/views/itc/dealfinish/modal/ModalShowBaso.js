import { Button, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import React from "react";

function ModalShowBaso({ handleOpen, foto }) {
    return (
        <div>
            <DialogHeader className="font-poppins font-medium">Foto BASO</DialogHeader>
            <DialogBody>
                <img src={foto} className="w-full h-96" />
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="gray"
                    onClick={handleOpen}
                    className="mr-1 font-poppins font-medium"
                >
                    <span>Tutup</span>
                </Button>
            </DialogFooter>
        </div>
    )
}

export default ModalShowBaso;