import axios from "axios";

export const sendAlert = async(type, location, severity) => {
    const message = `${type} Disaster happend in ${location} with ${severity} severity`
    let token = "5631914850:AAEW9VB3wtWHm9Ws4nBxXWKNOczovsJawrw";
    let api = `https://api.telegram.org/bot${token}`;
    await axios.post(`${api}/sendMessage`, {
        chat_id: "-731360208",
        text: message,
    });
};
export const sendDemandMessage = async(disasterName, supplyType, location, quantity, creatorName) => {
    const message = `New Demand for ${disasterName} \nSupply Type: ${supplyType} \nLocation: ${location} \nQuantity: ${quantity} \nBy: ${creatorName}`;
    let token = "5777864834:AAGRVO9HBmSnID3gapS3YR4qUI06HajZDqY";
    let api = `https://api.telegram.org/bot${token}`;
    await axios.post(`${api}/sendMessage`, {
        chat_id: "-731360208",
        text: message,
    });
}