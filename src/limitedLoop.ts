export async function limitedLoop(totalIterations: number, iterationsPerMinute: number,callback: (partName: string) => Promise<boolean>) {
  const delayBetweenIterations = 60000 / iterationsPerMinute; // Calculate delay in milliseconds
  let realIterate = -1
  for (let i = 0; i < totalIterations; i++) {
      const partName = "part_" + (i+1).toString().padStart(2, '0');
      // Your loop logic here
      console.log(`Iteration ${i + 1} of ${totalIterations}: Executing loop logic`);
      const isSkip = await callback(partName);
      if (!isSkip) {
        // Delay until the next iteration
        realIterate += 1
        if ((realIterate + 1) % iterationsPerMinute !== 0) {
            await new Promise(resolve => setTimeout(resolve, delayBetweenIterations));
        } 
        // else if (realIterate + 1 < totalIterations) {
        //     // Wait for the full minute if we've done the max iterations in this minute
        //     await new Promise(resolve => setTimeout(resolve, 60000));
        // }
      }
  }
  console.log("Loop finished.");
}