import axios from "axios";
export const sendMessage = async (message, bot) => {
  let token;
  if (bot == "alert") {
    token = "5631914850:AAEW9VB3wtWHm9Ws4nBxXWKNOczovsJawrw";
  } else if (bot == "demand") {
    token = "5777864834:AAGRVO9HBmSnID3gapS3YR4qUI06HajZDqY";
  }
  let api = `https://api.telegram.org/bot${token}`;
  await axios.post(`${api}/sendMessage`, {
    chat_id: "-731360208",
    text: message,
  });
};
export const demandMsg = (disasterName, supplyType, location, quantity) => {
  return `New Demand for ${disasterName} \nSupply Type: ${supplyType} \nLocation: ${location} \nQuantity: ${quantity}`;
};
export const alertMsg = (type, location, severity) => {
  return `${type} Disaster happend in ${location} with severity of ${severity}`;
};
