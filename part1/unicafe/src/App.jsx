import { useState } from "react";

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function Statistics({ good, neutral, bad, all, average, positive }) {
  return (
    <>
      {all > 0 ? (
        <>
          <h2>statistics</h2>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive} />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td scope="row">{text}</td>
      <td>
        {text !== "positive" && text !== "average" && value}
        {text === "average" && parseFloat(value).toFixed(1)}
        {text === "positive" && `${(parseFloat(value) * 100).toFixed(1)} %`}
      </td>
    </tr>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? good / all : 0;

  function handleGoodFeedbak() {
    setGood(good + 1);
  }

  function handleNeutralFeedbak() {
    setNeutral(neutral + 1);
  }
  function handleBadFeedbak() {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodFeedbak} text="good"></Button>
      <Button onClick={handleNeutralFeedbak} text="neutral"></Button>
      <Button onClick={handleBadFeedbak} text="bad"></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
}

export default App;
