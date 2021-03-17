import React, { useMemo, useState } from "react";
import _ from "lodash";
import styled from "styled-components";

import PlayerRow from "./PlayerRow";

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
`;

const StyledTableHeader = styled.th`
  padding: 8px;
  background-color: #be5564;
  color: white;

  border: 2px solid #635d5d;
`;

const Scoreboard = (props) => {
  const { names } = props;

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

  return (
    <StyledTable>
      <tbody>
        <tr>
          <StyledTableHeader>Name</StyledTableHeader>
          {roundHeaders}
          <StyledTableHeader>Total</StyledTableHeader>
        </tr>
        {playerRows}
      </tbody>
    </StyledTable>
  );
};

export default Scoreboard;
