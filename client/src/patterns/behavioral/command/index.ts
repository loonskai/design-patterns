interface Command {
  execute(receiver: Receiver): void;
  undo(receiver: Receiver): void;
}

class Receiver {

}

export class Invoker {
  private undoList: Command[];
  private redoList: Command[];
}

class DrawCommand implements Command {
  public execute(receiver: Receiver): void {

  }

  public undo(receiver: Receiver): void {

  }
}

class FigureCommand implements Command {
  public execute(receiver: Receiver): void {

  }

  public undo(receiver: Receiver): void {

  }
}
