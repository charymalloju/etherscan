// pages/contractDetails.js
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { fetchContractABI } from '../utils/contractUtils';

export default function ContractDetails() {
  const [contractAddress, setContractAddress] = useState('');
  const [functions, setFunctions] = useState([]);
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        // Fetch contract ABI
        const abi = await fetchContractABI(contractAddress);

        // Instantiate contract
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Get contract functions
        const contractFunctions = Object.keys(contract.functions);
        setFunctions(contractFunctions);

        // Get contract variables
        const contractVariables = Object.keys(contract);
        setVariables(contractVariables);
      } catch (error) {
        console.error('Error fetching contract details:', error);
      }
    };

    if (contractAddress) {
      fetchContractDetails();
    }
  }, [contractAddress]);

  return (
    <div>
      <h1>Contract Details</h1>
      <input
        type="text"
        placeholder="Enter contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <div>
        <h2>Functions</h2>
        <ul>
          {functions.map((func, index) => (
            <li key={index}>{func}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Variables</h2>
        <ul>
          {variables.map((variable, index) => (
            <li key={index}>{variable}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
