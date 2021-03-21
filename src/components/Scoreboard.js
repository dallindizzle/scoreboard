import React, { useMemo, useState, useCallback } from "react";
import _ from "lodash";
import styled from "styled-components";

import PlayerRow from "./PlayerRow";
import AddPlayerRow from "./AddPlayerRow";

const StyledTable = styled.table`
  margin: 50px auto 50px auto;

  border-collapse: collapse;

  text-align: center;

  font-size: 25px;
  font-family: Arial, serif;

  td,
  th {
    width: 100px;
    height: 75px;

    border: 2px solid #635d5d;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const defaultNames = ["Dad", "Mom", "Dallin", "Brandon", "Kortney", "Karli"];

const StyledTableHeader = styled.th`
  padding: 8px;
  background-color: #be5564;
  color: white;

  border: 2px solid #635d5d;
`;

const Scoreboard = () => {
  const [names, setNames] = useState([]);

  const [playerTotals, setPlayerTotals] = useState({});

  const leadingPlayer = useMemo(() => {
    if (Object.keys(playerTotals).length > 0) {
      return Object.keys(playerTotals).reduce((a, b) =>
        playerTotals[a] < playerTotals[b] ? a : b
      );
    }
  }, [playerTotals]);

  const roundHeaders = useMemo(
    () =>
      _.times(names.length, (i) => (
        <StyledTableHeader key={i}>{i + 1}</StyledTableHeader>
      )),
    [names.length]
  );

  const playerRows = useMemo(
    () =>
      names.map((name) => (
        <PlayerRow
          name={name}
          numOfRounds={names.length}
          setPlayerTotals={setPlayerTotals}
          leading={leadingPlayer === name}
          key={name}
        />
      )),
    [leadingPlayer, names]
  );

  const addPlayer = useCallback((name) => {
    setNames((prevNames) => {
      const newNames = [...prevNames];
      newNames.push(name);
      return newNames;
    });
  }, []);

  return (
    <StyledTable>
      <tbody>
        <tr>
          <StyledTableHeader>Name</StyledTableHeader>
          {roundHeaders}
          <StyledTableHeader>Total</StyledTableHeader>
        </tr>
        {playerRows}
        <AddPlayerRow addPlayer={addPlayer} />
      </tbody>
    </StyledTable>
  );
};

export default Scoreboard;
