class Actions {
  public static Shuffle: (value: string[]) => string[] = (value: string[]) => {
    let len = value.length;
    const result: string[] = [];
    while((result.length !== value.length)){
      const pos = Math.floor((Math.random() * len) + 1) - 1;
      if(result.length !== value.length){
        const value1 = value[pos];
        if(!result.includes(value1)){
          result.push(value1);
        }
      }
    }
    return result;
  }
}

export default Actions