class Instruction {
  constructor(instruction) {
    this.instruction = instruction;
  }

  getOpcodeAndModes() {
    const filledCode = this.instruction.toString().padStart(5, "0");
    this.opcode = filledCode % 100;
    this.firstParamMode = Math.floor(filledCode / 100) % 10;
    this.secondParamMode = Math.floor(filledCode / 1000) % 10;
  }
}

module.exports = Instruction;
