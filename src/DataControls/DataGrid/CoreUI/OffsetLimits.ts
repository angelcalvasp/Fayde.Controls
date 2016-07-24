module Controls.Fayde {
    export class OffsetLimits  {

    public constructor(lowerLimit: number,upperLimit: number)
    {
      this.LowerLimit = lowerLimit;
      this.UpperLimit = upperLimit;
    }

    public LowerLimit: number;
    public UpperLimit: number;

  }
}