const prompt = require("prompt-sync")({ sigint: true });

///////////////////////////////////////////////////////////////////////////////
// First, you'll need to add two new instructions:
//
// Opcode 3 takes a single integer as input and saves it to the position given by its only parameter. For example, the instruction 3,50 would take an input value and store it at address 50.
// Opcode 4 outputs the value of its only parameter. For example, the instruction 4,50 would output the value at address 50.
// e.g. The program 3,0,4,0,99 outputs whatever it gets as input, then halts.
// Opcode 1 +
// Opcode 2 *

///////////////////////////////////////////////////////////////////////////////
// Second, you'll need to add support for parameter modes:
// Each parameter of an instruction is handled based on its parameter mode.
//
// parameter mode 0, position mode - parameter is interpreted as a position
// e.g. the parameter is 50, its value is the value stored at address 50 in memory.
//
// parameter mode 1, immediate mode - parameter is interpreted as a value
// e.g. the parameter is 50, its value is simply 50.
//
// Parameter modes are stored in the same value as the instruction's opcode.
// The opcode is a two-digit number based only on the ones and tens digit of the value
// i.e. rightmost two digits of the first value in an instruction.
// Parameter modes are single digits, one per parameter, read right-to-left from the opcode
// i.e. the first parameter's mode is in the hundreds digit,
//      the second parameter's mode is in the thousands digit,
//      the third parameter's mode is in the ten-thousands digit, and so on.
//      Any missing modes are 0.

// For example, consider the program 1002,4,3,4,33.
//
// 02 - the rightmost two digits of the first value, 02, indicate opcode 2, multiplication
// 0   4 Pos    Array[4] -> 33
// 1   3 Val           3
// 0   4 Pos    Write to Array[4] -> 33 * 3 = 99
//
// Parameters that an instruction writes to will never be in immediate mode.
// Notes:
//  - instruction pointer should increase by the number of values in the instruction after the instruction finishes.
//  - Integers can be negative: 1101,100,-1,4,0 is a valid program (find 100 + -1, store the result in position 4).

class IntcodeComputer {
  constructor(testInstructions) {
    this.testInstructions = this.getTestDataFromInput(testInstructions);
    this.currentPosition = 0;
    this.settings;
    this.results;
  }

  getUserInput() {
    const id = prompt("What is the ID of the system? ");
    console.log("Processing... ");
    return parseInt(id, 10);
  }

  getTestDataFromInput(input) {
    return input.split(",").map((str) => parseInt(str, 10));
  }

  getOpcodeAndModes() {
    const filledCode = this.testInstructions[this.currentPosition]
      .toString()
      .padStart(5, "0");
    this.settings = {
      opcode: filledCode % 100,
      firstParamMode: Math.floor(filledCode / 100) % 10,
      secondParamMode: Math.floor(filledCode / 1000) % 10,
      outputParamMode: Math.floor(filledCode / 10000) % 10,
    };
  }

  getValuesAndPositionForOperation() {
    const fullInstruction = this.testInstructions;
    const curPos = this.currentPosition;

    if (this.settings.opcode <= 2) {
      const firstValue = this.settings.firstParamMode
        ? fullInstruction[curPos + 1]
        : fullInstruction[fullInstruction[curPos + 1]];
      const secondValue = this.settings.secondParamMode
        ? fullInstruction[curPos + 2]
        : fullInstruction[fullInstruction[curPos + 2]];
      const outputPosition = fullInstruction[curPos + 3];

      this.results = {
        firstValue,
        secondValue,
        outputPosition,
      };
    } else {
      const outputPosition = fullInstruction[curPos + 1];
      this.results = {
        outputPosition,
      };
    }
  }

  executeOperation() {
    switch (this.settings.opcode) {
      case 1:
        this.testInstructions[this.results.outputPosition] =
          this.results.firstValue + this.results.secondValue;
        this.currentPosition += 4;
        break;
      case 2:
        this.testInstructions[this.results.outputPosition] =
          this.results.firstValue * this.results.secondValue;
        this.currentPosition += 4;
        break;
      case 3:
        this.testInstructions[this.results.outputPosition] =
          this.getUserInput();
        this.currentPosition += 2;
        break;
      case 4:
        console.log(this.testInstructions[this.results.outputPosition]);
        this.currentPosition += 2;
        break;
    }
  }

  shouldQuitProgram() {
    return this.settings.opcode === 99;
  }

  printResult() {
    console.log(this.testInstructions);
  }
}

function startIntcodeComputerProcess(testInstructions) {
  const program = new IntcodeComputer(testInstructions);

  // const testData = getTestDataFromInput(testInput);
  while (program.currentPosition < program.testInstructions.length) {
    program.getOpcodeAndModes();

    if (program.shouldQuitProgram()) {
      return program.testInstructions;
    }

    program.getValuesAndPositionForOperation();
    program.executeOperation();
  }
  return program.testInstructions;
}

module.exports = startIntcodeComputerProcess;