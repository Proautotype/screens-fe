class Texts {
  protected static instructions =  "Make sure you have a stable internet connection.\n" +
    "Use a laptop or desktop computer if possible. Mobile devices are not recommended.\n" +
    "Make sure you are in a quiet and well-lit room.\n" +
    "Do not leave the exam room during the exam.\n" +
    "Do not use any unauthorized materials, including notes, books, or calculators.\n" +
    "Do not communicate with anyone during the exam.\n" +
    "If you have any technical problems during the exam, stop the exam and contact your instructor immediately";

  protected static cameraInstructions = "Make sure your camera and microphone\n" +
    "      is turned ON.\n" +
    "Position the webcam so that your face is\n" +
    "       clearly visible.\n" +
    "Do not look away from the camera during the exam.";

  public static getInstructions(): string[] {
    return this.instructions.split('.')
  }

  public static getCameraInstructions(): string[]{
    return this.cameraInstructions.split('.')
  }

  public static generateRandom () {
    return Math.random().toString(36).substring(2, 9)
  }

}

export default Texts