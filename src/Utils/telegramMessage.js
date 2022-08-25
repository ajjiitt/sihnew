import axios from "axios";
export const sendMessage = async (message) => {
  const token = "5777864834:AAGRVO9HBmSnID3gapS3YR4qUI06HajZDqY";
  let api = `https://api.telegram.org/bot${token}`;
  await axios.post(`${api}/sendMessage`, {
    chat_id: "-731360208",
    text: message,
  });
};
