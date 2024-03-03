// utils/contractUtils.js
import axios from 'axios';

async function fetchContractABI(contractAddress) {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=FMSQ49Y9I15WFQ38NQ9P2VEMZKGPZH1ST6`
    );

    console.log('response===========', response)

    if (response.data.status === '1') {
      return JSON.parse(response.data.result);
    } else {
      throw new Error('Failed to fetch contract ABI');
    }
  } catch (error) {
    console.error('Error fetching contract ABI in catch:', error);
    throw error;
  }
}

export { fetchContractABI };
