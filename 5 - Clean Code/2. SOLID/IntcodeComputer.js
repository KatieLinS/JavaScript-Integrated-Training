const prompt = require("prompt-sync")({ sigint: true });

class IntcodeComputer {
  constructor(testInstructions) {
    this.testInstructions = this.convertInstructionsIntoArray(testInstructions);
    this.currentPosition = 0;
  }

  getUserInput() {
    const id = prompt("What is the ID of the system? ");
    console.log("Processing... ");
    return parseInt(id, 10);
  }

  convertInstructionsIntoArray(instructions) {
    return instructions.split(",").map((str) => parseInt(str, 10));
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
    const fullInst = this.testInstructions;
    const curPos = this.currentPosition;

    if (this.settings.opcode <= 2) {
      this.result = {
        firstVal: this.settings.firstParamMode
          ? fullInst[curPos + 1]
          : fullInst[fullInst[curPos + 1]],
        secondVal: this.settings.secondParamMode
          ? fullInst[curPos + 2]
          : fullInst[fullInst[curPos + 2]],
        outputPos: fullInst[curPos + 3],
      };
    } else {
      this.result = {
        outputPos: fullInst[curPos + 1],
      };
    }
  }

  runOperation() {
    const fullInst = this.testInstructions;
    const result = this.result;

    switch (this.settings.opcode) {
      case 1:
        fullInst[result.outputPos] = result.firstVal + result.secondVal;
        this.currentPosition += 4;
        break;
      case 2:
        fullInst[result.outputPos] = result.firstVal * result.secondVal;
        this.currentPosition += 4;
        break;
      case 3:
        this.testInstructions[result.outputPos] = this.getUserInput();
        this.currentPosition += 2;
        break;
      case 4:
        console.log(this.testInstructions[result.outputPos]);
        this.currentPosition += 2;
        break;
    }
  }

  shouldQuitProgram() {
    return this.settings.opcode === 99;
  }

  runDiagnosticProgram() {
    while (this.currentPosition < this.testInstructions.length) {
      this.getOpcodeAndModes();

      if (this.shouldQuitProgram()) {
        return this.testInstructions;
      }

      this.getValuesAndPositionForOperation();
      this.runOperation();
    }
    return this.testInstructions;
  }
}

module.exports = IntcodeComputer;
