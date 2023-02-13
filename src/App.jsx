import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";

function App() {
  let nums = [2, 7, 9, 3, 1];
  const dp = Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  console.log(dp[nums.length - 1]);
  return (
    <div className="App">
      <Header></Header>
      <Container>
        <TableUser></TableUser>
      </Container>
    </div>
  );
}

export default App;
