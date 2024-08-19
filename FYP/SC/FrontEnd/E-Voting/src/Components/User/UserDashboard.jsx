import React from 'react';
import Slidebar from '../NavigationBar/Slidebar';

const UserDashboard = () => {
  return (
    <div className="flex bg-white text-black min-h-screen">
      <Slidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">User Information</h2>
        <div className="card-body bg-gray-100 p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Welcome</h4>
          <h5 className="text-lg font-medium mb-2">These are a few guidelines for the user:</h5>
          
          <h5 className="text-lg font-medium mt-4">1. Voter Registration</h5>
          <ul className="list-disc list-inside ml-5 mt-2 space-y-2">
            <li>For casting the vote, the user needs to first register. For this, the user will be provided a voter registration form on this website.</li>
            <li>The voter can only register during the registration phase. After the registration phase is over, the user cannot register and thus will not be able to vote.</li>
            <li>For registration, the user will have to enter their Aadhar card number and the account address which the user will be using for voting purposes.</li>
            <li>At the first stage, the user’s age will be checked. If the user is 18 or above 18 years of age, then only they are eligible to vote.</li>
            <li>The second stage is OTP verification. This stage is required to validate the voter. After entering the Aadhar number and successful age verification, the user will need to enter the correct OTP to complete registration.</li>
            <li>After entering the correct OTP, the user will be successfully registered.</li>
          </ul>

          <h5 className="text-lg font-medium mt-4">2. Voting Process</h5>
          <ul className="list-disc list-inside ml-5 mt-2 space-y-2">
            <li>Overall, the voting process is divided into three phases, all of which will be initialized and terminated by the admin. Users have to participate in the process according to the current phase.</li>
          </ul>
          <ol className="list-decimal list-inside ml-5 mt-2 space-y-2">
            <li><strong>Registration Phase</strong>: During this phase, the registration of users (who are going to cast the vote) will be carried out.</li>
            <li><strong>Voting Phase</strong>: After initialization of the voting phase by the admin, users can cast their vote in the voting section. The casting of the vote can be done by clicking the “VOTE” button, after which the transaction will be initiated. After confirming the transaction, the vote will be successfully casted. After the voting phase ends, users will not be able to cast a vote.</li>
            <li><strong>Result Phase</strong>: This is the final stage of the whole voting process during which the results of the election will be displayed in the “Result” section.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
