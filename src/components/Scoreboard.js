import React, { useCallback, useMemo, useState } from "react";
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
  tr,
  th {
    width: 100px;
    height: 75px;

    padding: 5px;

    border: 2px solid #635d5d;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledTableHeader = styled.th`
  background-color: #be5564;
  color: white;
`;

const defaultNames = ["Dad", "Mom", "Dallin", "Brandon", "Kortney", "Karli"];

const Scoreboard = () => {
  const [names, setNames] = useState(defaultNames);
  const [playerTotals, setPlayerTotals] = useState({});

  const focusNextScore = useCallback(
    (player, round) => {
      const indexOfNextPlayer = names.indexOf(player) + 1;
      if (indexOfNextPlayer < names.length) {
        const nextPlayer = names[indexOfNextPlayer];
        document.getElementById(`${nextPlayer}:${round}`).focus();
      } else if (round < names.length - 1) {
        const nextPlayer = names[0];
        document.getElementById(`${nextPlayer}:${round + 1}`).focus();
      } else {
        document.getElementById(`${player}:${round}`).blur();
      }
    },
    [names]
  );

  const leadingPlayers = useMemo(() => {
    if (Object.keys(playerTotals).length > 0) {
      const sortedNames = Object.keys(playerTotals).sort(
        (a, b) => playerTotals[a] - playerTotals[b]
      );

      // There can be multiple leading players so find each of them
      const highestScore = playerTotals[sortedNames[0]];
      const leadingPlayers = [];
      sortedNames.every((player) => {
        if (playerTotals[player] === highestScore) {
          leadingPlayers.push(player);
          return true;
        } else {
          return false;
        }
      });
      return leadingPlayers;
    }
    return [];
  }, [playerTotals]);

  const roundHeaders = useMemo(
    () =>
      _.times(names.length, (i) => (
        <StyledTableHeader key={i}>{i + 1}</StyledTableHeader>
      )),
    [names.length]
  );

  const removePlayer = useCallback((name) => {
    setNames((prevNames) => prevNames.filter((player) => player !== name));
  }, []);

  const addPlayer = useCallback((name) => {
    name && setNames((prevNames) => [...new Set([...prevNames, name])]);
  }, []);

  const playerRows = useMemo(
    () =>
      names.map((name) => (
        <PlayerRow
          name={name}
          numOfRounds={names.length}
          setPlayerTotals={setPlayerTotals}
          leading={leadingPlayers.includes(name)}
          key={name}
          removePlayer={removePlayer}
          focusNextScore={focusNextScore}
        />
      )),
    [focusNextScore, leadingPlayers, names, removePlayer]
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
        <AddPlayerRow addPlayer={addPlayer} />
      </tbody>
    </StyledTable>
  );
};

export default Scoreboard;
