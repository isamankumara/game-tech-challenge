import React from "react";
import { render, screen } from "@testing-library/react";
import { getRandomOption, checkWinner } from '../../utils/logic.util';
import { options, winningOptions } from "../../constants/game.constants";

test("check getting random option", () => {
   const res = getRandomOption();
    expect(options).toContain(res);
});

test("check getting winner - rock and paper", () => {
    const res = checkWinner('rock', 'paper')
     expect(res).toBe('paper');
 });
 
 test("check getting winner - rock and scissors", () => {
    const res = checkWinner('rock', 'scissors')
     expect(res).toBe('rock');
 });

 test("check getting winner - paper and scissors", () => {
    const res = checkWinner('paper', 'scissors')
     expect(res).toBe('scissors');
 });

 test("check getting winner - paper and paper", () => {
    const res = checkWinner('paper', 'paper')
     expect(res).toBe('tie');
 });

 test("check getting winner - paper and rock", () => {
    const res = checkWinner('paper', 'rock')
     expect(res).toBe('paper');
 });
 
 test("check getting winner - scissors and rock", () => {
    const res = checkWinner('scissors', 'rock');
     expect(res).toBe('rock');;
 });

 test("check getting winner - scissors and paper", () => {
    const res = checkWinner('scissors', 'paper');
     expect(res).toBe('scissors');
 });