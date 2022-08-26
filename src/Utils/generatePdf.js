import { jsPDF } from "jspdf";
import QRCode from "qrcode";
const generateQR = async(msg) => await QRCode.toDataURL(msg);
export const generatePdf = async(message, data) => {
    try {
        await generateQR(message).then((res) => {
            console.log(res);
            const doc = new jsPDF();
            //   generatePdf("Hello world", {
            //     supplyType: "Home ",
            //     requestedBy: "Ghi",
            //     deliveryAddress: "Mumbai",
            //     amount: 100,
            //     state: "Dispatched",
            //   });
            doc.text(`Supply Type: ${data.supplyType}`, 10, 20);
            doc.text(`Requested By: ${data.requestedBy}`, 10, 30);
            doc.text(`Address: ${data.deliveryAddress}`, 10, 40);
            // doc.text(`State: ${data.state}`, 10, 50);
            doc.text(`State: Initiated`, 10, 80);
            doc.text(`Amount: ${data.amount}`, 10, 90);
            doc.addImage(res, "png", 100, 5, 90, 90);
            doc.text(`Code : XYZ`, 130, 100);
            doc.save(`reciept_${data.supplyType}.pdf`);
        });
    } catch (err) {
        console.error(err);
    }
};